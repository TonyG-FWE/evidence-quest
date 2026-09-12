# Item10 document/schema checks only; does not load or implement the game.
$ErrorActionPreference = 'Stop'
$eqDir = Split-Path -Parent $PSScriptRoot
$eqSchemaPath = Join-Path $eqDir 'asset-manifest.schema.json'
$eqBody = Get-Content -LiteralPath (Join-Path $eqDir 'asset-manifest.json') -Raw
$eqData = $eqBody | ConvertFrom-Json -AsHashtable -Depth 100
$eqResults = @()
$eqErrors = @()
$eqOk = Test-Json -Json $eqBody -SchemaFile $eqSchemaPath -ErrorAction SilentlyContinue -ErrorVariable eqErrors
$eqResults += [ordered]@{id='manifest-schema';expected=$true;actual=[bool]$eqOk;passed=[bool]$eqOk;errors=@($eqErrors | ForEach-Object { $_.ToString() })}
foreach ($eqFixture in @('missing-asset-id','bad-content-reference','bad-anchor','zero-frames','unexpected-field')) {
    $eqCopy = $eqBody | ConvertFrom-Json -AsHashtable -Depth 100
    switch ($eqFixture) {
        'missing-asset-id' { $eqCopy.assets[0].Remove('id') }
        'bad-content-reference' { $eqCopy.assets[0].contentRefs = @('CT.INVENTED.ANSWER') }
        'bad-anchor' { $eqCopy.bindings[0].assetUse.anchor = @(1.2,0) }
        'zero-frames' { $eqCopy.assets[0].variants[0].frames = 0 }
        'unexpected-field' { $eqCopy.assets[0].approvalInvented = $true }
    }
    $eqActual = Test-Json -Json ($eqCopy | ConvertTo-Json -Depth 100 -Compress) -SchemaFile $eqSchemaPath -ErrorAction SilentlyContinue
    $eqResults += [ordered]@{id=$eqFixture;expected=$false;actual=[bool]$eqActual;passed=(-not $eqActual)}
}
$eqContracts = Get-Content -LiteralPath (Join-Path (Split-Path -Parent $eqDir) '09-technical-contracts/contracts.schema.json') -Raw | ConvertFrom-Json -AsHashtable -Depth 100
$eqUseSchema = [ordered]@{'$schema'='https://json-schema.org/draft/2020-12/schema';'$defs'=$eqContracts['$defs'];'$ref'='#/$defs/AssetUse'} | ConvertTo-Json -Depth 100 -Compress
$eqBadUses = @()
foreach ($eqBinding in $eqData.bindings) {
    $eqValid = Test-Json -Json ($eqBinding.assetUse | ConvertTo-Json -Depth 30 -Compress) -Schema $eqUseSchema -ErrorAction SilentlyContinue
    if (-not $eqValid) { $eqBadUses += $eqBinding.id }
}
$eqResults += [ordered]@{id='original-Item09-AssetUse';checked=$eqData.bindings.Count;expected=$true;actual=($eqBadUses.Count -eq 0);passed=($eqBadUses.Count -eq 0);failures=$eqBadUses}
$eqFailures = @($eqResults | Where-Object { -not $_.passed })
$eqReport = [ordered]@{scope='Schema and contract checks, including deliberately invalid document fixtures; no gameplay tests.';engine=('PowerShell '+$PSVersionTable.PSVersion.ToString()+' Test-Json');executedAt=(Get-Date).ToUniversalTime().ToString('o');passed=($eqFailures.Count -eq 0);results=$eqResults}
$eqReport | ConvertTo-Json -Depth 100 | Set-Content -LiteralPath (Join-Path $eqDir 'schema-check-results.json') -Encoding utf8
[ordered]@{passed=$eqReport.passed;checks=$eqResults.Count;failed=$eqFailures} | ConvertTo-Json -Depth 30
if (-not $eqReport.passed) { exit 1 }

