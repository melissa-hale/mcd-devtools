// async function fetchData() {
//   var request = JSON.stringify({
//     query:
//       "query getUser {\n  getUser {\n    __typename\n    id # The ID of the object.\n    cognitoUserId\n    email\n    firstName\n    lastName\n    displayName # Text to use when displaying the user.\n    state\n    createdOn\n    isSso\n    ssoGroups # Groups provided by the IdP in the last login\n    ssoGroupsUpdatedAt # Last time the SSO groups where updated\n    tokenId # For role=service accounts, the associated API token ID\n    isDeleted\n    # notificationSettingsAdded # Creator of the notification\n    # notificationSettingsModified # User who last updated this notification\n    # userSettings # Associated user\n    # invitees\n    # warehouseDeletedBy\n    # monitorLabelsCreated # Monitor label creator\n    # eventmodelSet\n    # incidentReactionsCreated\n    # incidentReactionsModified\n    # userComments\n    # creator # Who added the monitor\n    # metricmonitoringmodelSet # Who was the last user to update the monitor\n    # combinedtablestatsmodelSet\n    # objectProperties # Who last updated the property\n    # catalogObjectMetadata # Who last updated the object\n    # resources # Who last updated the resource\n    # lineageBlockPatterns # Who last updated the regexp\n    # lineageReplRules # Who last updated the replacement rule\n    # monteCarloConfigTemplates\n    # domainCreatedBy\n    # slackCredentialsV2 # User that installed the Slack app\n    # customUsers # Who last updated the object\n    # unifiedUsers # Associated MC user\n    # lastUpdatedUnifiedUsers # Who last updated the object\n    # collectionPreferenceCreatedBy\n    # collectionPreferenceLastUpdatedBy\n    # collectionPreferenceDeletedBy\n    # ghInstallations # User that installed the Github app\n    # dataProductCreatedBy\n    # dataProductLastUpdatedBy\n    # dataProductDeletedBy\n    # account\n    role # User internal role. One of:  user, service, system. Check the user's groups for their authorization roles\n    # auth # User's aggregate authorization policy.\n  }\n}",
//   });

//   var xhr = new XMLHttpRequest();

//   xhr.addEventListener("readystatechange", function () {
//     if (this.readyState === 4) {
//       var responseJson = JSON.parse(this.responseText);
//       console.log(responseJson);
//     }
//   });

//   xhr.open("POST", "https://graphql.getmontecarlo.com/graphql");
//   xhr.setRequestHeader("Content-Type", "application/json");
//   xhr.withCredentials = true;

//   xhr.send(request);
// }
// fetchData();
