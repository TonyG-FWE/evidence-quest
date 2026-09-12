# Contract examples only. Does not start, install, or run a game.
$ErrorActionPreference = 'Stop'
$contractDir = Split-Path -Parent $PSScriptRoot
$schemaPath = Join-Path $contractDir 'contracts.schema.json'
$examples = Get-Content -LiteralPath (Join-Path $contractDir 'examples.json') -Raw | ConvertFrom-Json -AsHashtable -DateKind String
$results = @()
foreach ($case in $examples.cases) {
    $body = ConvertTo-Json -InputObject $case.payload -Depth 100 -Compress
    $validationErrors = @()
    $actual = Test-Json -Json $body -SchemaFile $schemaPath -ErrorAction SilentlyContinue -ErrorVariable validationErrors
    $results += [ordered]@{id=$case.id; expected=[bool]$case.expectedSchema; actual=[bool]$actual; passed=([bool]$actual -eq [bool]$case.expectedSchema)}
}
$sourceSchema = Get-Content -LiteralPath $schemaPath -Raw | ConvertFrom-Json -AsHashtable
$proposalSchema = [ordered]@{'$schema'='https://json-schema.org/draft/2020-12/schema'; '$defs'=$sourceSchema['$defs']; '$ref'='#/$defs/ModelProposal'} | ConvertTo-Json -Depth 100
foreach ($fixture in @(
    @{id='model-abstention'; body='{"moveId":"NO_ELIGIBLE_MOVE","interpretation":"unclear","refs":[],"uncertain":true}'; expected=$true},
    @{id='model-invented-action'; body='{"moveId":"PLACE_TILE_NOW","interpretation":"valid_plan","refs":[],"uncertain":false}'; expected=$false}
)) {
    $actual = Test-Json -Json $fixture.body -Schema $proposalSchema -ErrorAction SilentlyContinue
    $results += [ordered]@{id=$fixture.id; expected=$fixture.expected; actual=[bool]$actual; passed=([bool]$actual -eq $fixture.expected)}
}
$failed = @($results | Where-Object { -not $_.passed })
$report = [ordered]@{scope='JSON Schema example validation only'; engine=('PowerShell ' + $PSVersionTable.PSVersion.ToString() + ' Test-Json'); executedAt=(Get-Date).ToUniversalTime().ToString('o'); total=$results.Count; passed=($results.Count-$failed.Count); failed=$failed.Count; results=$results}
$report | ConvertTo-Json -Depth 100 | Set-Content -LiteralPath (Join-Path $contractDir 'schema-validation.json') -Encoding utf8
[ordered]@{total=$results.Count; failed=$failed.Count; failures=$failed} | ConvertTo-Json -Depth 10
if ($failed.Count -gt 0) { exit 1 }

