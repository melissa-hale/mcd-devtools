export async function getActiveTabUrl() {
  let queryOptions = { active: true, currentWindow: true };
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}

export function generateCreateMaintenanceQuery(vars) {
  var query = JSON.stringify({
    query:
      "mutation createOrUpdateDataMaintenanceEntry(\n    $dwId: UUID!\n    $id: Int\n    $project: String,\n    $dataset: String\n    $mcon: String,\n    $startTime: DateTime,\n    $endTime: DateTime,\n    $maintenanceType: DataMaintenanceMetric\n  ) {\n    createOrUpdateDataMaintenanceEntry(\n      dwId: $dwId\n      id: $id\n	  project: $project\n      dataset: $dataset\n      mcon: $mcon\n      startTime: $startTime\n      endTime: $endTime\n      maintenanceType: $maintenanceType\n    ) {\n        entry {\n            id\n            maintenanceType\n            fullTableId\n            database\n            database\n            startTime\n            endTime\n            resourceUuid\n        }\n    }\n  }",
    variables: {
      startTime: vars.startTime,
      endTime: vars.endTime,
      mcon: vars.mcon,
      dataset: null,
      id: vars.id ?? null,
      dwId: vars.dwid ?? null,
      project: null,
      maintenanceType: null,
    },
  });
  return query;
}

export function generateUsersQuery() {
  var query = JSON.stringify({
    query:
      "query getUser {\n  getUser {\n    __typename\n    id # The ID of the object.\n    cognitoUserId\n    email\n    firstName\n    lastName\n    displayName # Text to use when displaying the user.\n    state\n    createdOn\n    isSso\n    ssoGroups # Groups provided by the IdP in the last login\n    ssoGroupsUpdatedAt # Last time the SSO groups where updated\n    tokenId # For role=service accounts, the associated API token ID\n    isDeleted\n    # notificationSettingsAdded # Creator of the notification\n    # notificationSettingsModified # User who last updated this notification\n    # userSettings # Associated user\n    # invitees\n    # warehouseDeletedBy\n    # monitorLabelsCreated # Monitor label creator\n    # eventmodelSet\n    # incidentReactionsCreated\n    # incidentReactionsModified\n    # userComments\n    # creator # Who added the monitor\n    # metricmonitoringmodelSet # Who was the last user to update the monitor\n    # combinedtablestatsmodelSet\n    # objectProperties # Who last updated the property\n    # catalogObjectMetadata # Who last updated the object\n    # resources # Who last updated the resource\n    # lineageBlockPatterns # Who last updated the regexp\n    # lineageReplRules # Who last updated the replacement rule\n    # monteCarloConfigTemplates\n    # domainCreatedBy\n    # slackCredentialsV2 # User that installed the Slack app\n    # customUsers # Who last updated the object\n    # unifiedUsers # Associated MC user\n    # lastUpdatedUnifiedUsers # Who last updated the object\n    # collectionPreferenceCreatedBy\n    # collectionPreferenceLastUpdatedBy\n    # collectionPreferenceDeletedBy\n    # ghInstallations # User that installed the Github app\n    # dataProductCreatedBy\n    # dataProductLastUpdatedBy\n    # dataProductDeletedBy\n    # account\n    role # User internal role. One of:  user, service, system. Check the user's groups for their authorization roles\n    # auth # User's aggregate authorization policy.\n  }\n}",
  });
  return query;
}

export function generateDeleteMaintenanceQuery(vars) {
  var query = JSON.stringify({
    query:
      "mutation deleteDataMaintenanceEntry ($id: Int!) {\n    deleteDataMaintenanceEntry (id: $id) {\n        success\n    }\n}",
    variables: { id: vars.id },
  });
  return query;
}

export function generateTableQuery(vars) {
  var query = JSON.stringify({
    query:
      "query getTable ($mcon: String) {\n    getTable (mcon: $mcon) {\n        id\n        warehouse {\n            uuid\n            name\n            dataCollector {\n                isCustom\n            }\n        }\n    }\n}",
    variables: {
      mcon: vars.mcon,
    },
  });
  return query;
}
