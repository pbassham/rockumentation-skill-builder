---
description: "Use when a developer needs to understand breaking changes, removed APIs, or migration requirements for Rock platform updates"
source: "https://community.rockrms.com/developer/changelog"
sourceLabel: Changelog
---
> **Path:** Technical Release Notes

# Technical Release Notes

While we make a huge effort to not break things during updates, when something can't be avoided we will document it here.

## Rock 20.0

---

**Developers — starting with v20.0**

- **v15 and Earlier Obsolete Methods/Properties Removed**
	Properties, classes, methods, and interfaces that were obsoleted in v15 and earlier have been removed from the code.
- **Extension Methods Moved to Rock.Common**
	If your projects use the core extension methods, you will need to add a reference to `Rock.Common`.

### 20.0.2 April 29, 2026

- All string, date, dictionary, JSON, decimal, etc. extension methods that were marked Obsolete in v13 in the `Rock.dll` assembly were moved to `Rock.Common.dll` where they still reside. These obsolete items in the `Rock.dll` have been removed so you will need to use the `Rock.Common.dll` to use those extensions.
	Properties, classes, methods, and interfaces that were obsoleted in v15 and earlier have been removed from the code. Including:
	- Rock.Badge.HighlightLabelBadge
			- Rock.Web.UI.IDetailBlock
			- Rock.Transactions.ITransactionWithProgress
			- Rock.Chart.FlotChartDataSet
			- Rock.Web.UI.Controls.FlotChart and sub-classes: LineChart, PieChart, etc.
			- *...to name a few of them. See full list below.*
	[Full list](#collapse20_0_2)
	The following members were removed from `Rock.Attribute.IHasInheritedAttributes`:
	- `GetAlternateEntityIds(RockContext rockContext)` (method)
	The following members were removed from `Rock.Badge.BadgeComponent`:
	- `GenerateBadgeKey(BadgeCache badge)` (method)
	- `GetWrappedJavaScript(BadgeCache badge)` (method)
	- `Render(BadgeCache badge, HtmlTextWriter writer)` (method)
	- `Rock.Badge.BadgeComponent.Entity` (property)
	- `Rock.Badge.BadgeComponent.ParentContextEntityBlock` (property)
	- `Rock.Badge.BadgeComponent.Person` (property)
	The public class `Rock.Badge.HighlightLabelBadge` was removed.
	The following members were removed from `Rock.Chart.ChartJsCategorySeriesDataFactory<TDataPoint>`:
	- `GetChartDataJson(GetJsonArgs args)` (method)
	The following members were removed from `Rock.Chart.ChartJsDataFactory`:
	- `Rock.Chart.ChartJsDataFactory.DisplayLegend` (property)
	- `Rock.Chart.ChartJsDataFactory.LegendAlignment` (property)
	- `Rock.Chart.ChartJsDataFactory.LegendPosition` (property)
	- `SetChartStyle(ChartStyle chartStyle)` (method)
	The following members were removed from `Rock.Chart.ChartJsDataFactory.GetJsonArgs`:
	- `Rock.Chart.ChartJsDataFactory.GetJsonArgs.ChartStyle` (property)
	The public class `Rock.Chart.FlotChartDataSet<TDataPoint>` was removed.
	The following members were removed from `Rock.CheckIn.RosterAttendee`:
	- `GetBadgesHtml(bool isMobile)` (method)
	- `Rock.CheckIn.RosterAttendee.HasHealthNote` (property)
	- `Rock.CheckIn.RosterAttendee.HasLegalNote` (property)
	The following members were removed from `Rock.Cms.StructuredContent.BlockTypes.ImageData`:
	- `Rock.Cms.StructuredContent.BlockTypes.ImageData.WithBackground` (property)
	- `Rock.Cms.StructuredContent.BlockTypes.ImageData.WithBorder` (property)
	The following members were removed from `Rock.Communication.CommunicationDetails`:
	- `Rock.Communication.CommunicationDetails.SMSFromDefinedValueId` (property)
	The following members were removed from `Rock.Communication.ICommunicationDetails`:
	- `Rock.Communication.ICommunicationDetails.SMSFromDefinedValueId` (property)
	The following members were removed from `Rock.Communication.Medium.Sms`:
	- `CreateCommunicationMobile(Person fromPerson, int? toPersonAliasId, string message, DefinedValueCache fromPhone, string responseCode, RockContext rockContext)` (method)
	- `CreateCommunicationMobile(Person fromPerson, int? toPersonAliasId, string message, DefinedValueCache fromPhone, string responseCode, RockContext rockContext, List<BinaryFile> attachments)` (method)
	The following members were removed from `Rock.Communication.RockSMSMessage`:
	- `Rock.Communication.RockSMSMessage.FromNumber` (property)
	The following members were removed from `Rock.Data.Entity<T>`:
	- `ContainsKey(object key)` (method)
	- `LaunchWorkflow(int? workflowTypeId, string workflowName = "", Dictionary<string, string> workflowAttributeValues)` (method)
	- `LaunchWorkflow(Nullable<Guid> workflowTypeGuid, string workflowName = "", Dictionary<string, string> workflowAttributeValues)` (method)
	The public class `Rock.Data.LavaIgnoreAttribute` was removed.
	The public class `Rock.Data.LavaIncludeAttribute` was removed.
	The following members were removed from `Rock.Data.Model<T>`:
	- `ContainsKey(object key)` (method)
	- `GetAlternateEntityIds(RockContext rockContext)` (method)
	The following extension methods were moved from `Rock` to `Rock.Common`:
	- `AddIfNotBlank(IDictionary<string, string> dictionary, string key, string value, bool replace = True)` (method)
	- `AddOrIgnore<TKey, TValue>(IDictionary<TKey, TValue> dictionary, TKey key, TValue value)` (method)
	- `AddOrReplace<TKey, TValue>(Dictionary<TKey, TValue> dictionary, TKey key, TValue value)` (method)
	- `AddOrReplace<TKey, TValue>(IDictionary<TKey, TValue> dictionary, TKey key, TValue value)` (method)
	- `Age(DateTime start)` (method)
	- `Age(DateTime? start)` (method)
	- `AsBoolean(string str, bool resultIfNullOrEmpty = False)` (method)
	- `AsBooleanOrNull(string str)` (method)
	- `AsDateKey(DateTime dateTime)` (method)
	- `AsDateTime(string str)` (method)
	- `AsDecimal(string str)` (method)
	- `AsDecimalInvariantCultureOrNull(string str)` (method)
	- `AsDecimalOrNull(string str)` (method)
	- `AsDouble(string str)` (method)
	- `AsDoubleOrNull(string str)` (method)
	- `AsGuid(string str)` (method)
	- `AsGuidOrNull(string str)` (method)
	- `AsInteger(string str)` (method)
	- `AsIntegerOrNull(string str)` (method)
	- `AsNumeric(string str)` (method)
	- `AsTimeSpan(string str)` (method)
	- `AsType<T>(string value)` (method)
	- `Bit(bool field)` (method)
	- `ConvertToEnum<T>(string enumValue, Nullable<T> defaultValue) where T : struct, new(), ValueType` (method)
	- `ConvertToEnumOrNull<T>(string enumValue, Nullable<T> defaultValue) where T : struct, new(), ValueType` (method)
	- `ConvertToInt(Enum eff)` (method)
	- `ConvertToString(Enum enumValue, bool splitCase = True)` (method)
	- `ConvertToStringSafe(Enum enumValue, bool splitCase = True)` (method)
	- `EncodeXml(string str, bool isAttribute = False)` (method)
	- `EndOfDay(DateTime dateTime)` (method)
	- `EndOfMonth(DateTime dt)` (method)
	- `EndOfWeek(DateTime dt, DayOfWeek startOfWeek)` (method)
	- `EndOfYear(DateTime dateTime)` (method)
	- `EnsureTrailingBackslash(string value)` (method)
	- `EnsureTrailingForwardslash(string value)` (method)
	- `EscapeQuotes(string str)` (method)
	- `EscapeXml(string str)` (method)
	- `FixCase(string text)` (method)
	- `Floor(decimal? value, int precision = 0)` (method)
	- `FormatAsPercent(decimal value)` (method)
	- `FromJsonDynamic(string val)` (method)
	- `FromJsonDynamicOrNull(string val)` (method)
	- `FromJsonOrNull<T>(string val)` (method)
	- `FromJsonOrThrow<T>(string val)` (method)
	- `GetAttribute<TAttribute>(Enum value)` (method)
	- `GetAttributeFrom<T>(object instance, string propertyName) where T : Attribute` (method)
	- `GetAttributes<TAttribute>(Enum value)` (method)
	- `GetDecimalPrecision(decimal value)` (method)
	- `GetDescription(Enum value)` (method)
	- `GetFlags<T>(Enum enumValue)` (method)
	- `GetFormattedAge(DateTime dateTime)` (method)
	- `GetNextWeekday(DateTime dateTime, DayOfWeek day)` (method)
	- `GetPropertyType(Type rootType, string propertyPathName)` (method)
	- `GetPropertyValue(object rootObj, string propertyPathName)` (method)
	- `GetValueOrDefault<TKey, TValue>(IDictionary<TKey, TValue> dictionary, TKey key, TValue defaultValue)` (method)
	- `GetValueOrNull<TKey>(IDictionary<TKey, DateTime> dictionary, TKey key)` (method)
	- `GetValueOrNull<TKey>(IDictionary<TKey, decimal> dictionary, TKey key)` (method)
	- `GetValueOrNull<TKey>(IDictionary<TKey, double> dictionary, TKey key)` (method)
	- `GetValueOrNull<TKey>(IDictionary<TKey, Guid> dictionary, TKey key)` (method)
	- `GetValueOrNull<TKey>(IDictionary<TKey, int> dictionary, TKey key)` (method)
	- `GetValueOrNull<TKey, TValue>(IDictionary<TKey, TValue> dictionary, TKey key)` (method)
	- `GetWeekOfMonth(DateTime dateTime, DayOfWeek firstDayOfWeek)` (method)
	- `GetWeekOfYear(DateTime dateTime, CalendarWeekRule calendarWeekRule, DayOfWeek firstDayOfWeek)` (method)
	- `HasMergeFields(string content)` (method)
	- `HmacSha1Hash(string str, string keyString)` (method)
	- `HmacSha256Hash(string str, string keyString)` (method)
	- `IfEmpty(string value, string nullValue)` (method)
	- `IsDigitsOnly(string str)` (method)
	- `IsEmpty(Guid guid)` (method)
	- `IsFuture(DateTime dateTime)` (method)
	- `IsNotNull<T>(T value)` (method)
	- `IsNotNullOrWhiteSpace(string str)` (method)
	- `IsNull<T>(T value)` (method)
	- `IsNullOrWhiteSpace(string str)` (method)
	- `IsPast(DateTime dateTime)` (method)
	- `IsToday(DateTime dateTime)` (method)
	- `IsValidMacAddress(string str)` (method)
	- `IsValidUrl(string str)` (method)
	- `JoinStrings(IEnumerable<string> source, string separator)` (method)
	- `JoinStringsWithCommaAnd(IEnumerable<string> source)` (method)
	- `Left(string str, int length)` (method)
	- `LeftWithEllipsis(string str, int length)` (method)
	- `MakeInt64HashCode(string str)` (method)
	- `MakeValidFileName(string name)` (method)
	- `Masked(string value)` (method)
	- `Masked(string value, bool preserveLength)` (method)
	- `Md5Hash(string str)` (method)
	- `MonthDayStringAsDateTime(string monthDayString)` (method)
	- `Pluralize(string str)` (method)
	- `PluralizeIf(string str, bool condition)` (method)
	- `Quoted(string str, string quoteChar = "'")` (method)
	- `ReadBytesToEnd(Stream stream)` (method)
	- `RemoveAllNonAlphaNumericCharacters(string str)` (method)
	- `RemoveAllNonNumericCharacters(string str)` (method)
	- `RemoveCrLf(string str)` (method)
	- `RemoveInvalidReservedUrlChars(string str)` (method)
	- `RemoveLeadingForwardslash(string value)` (method)
	- `RemoveSpaces(string input)` (method)
	- `RemoveSpecialCharacters(string str)` (method)
	- `RemoveWhiteSpace(string input)` (method)
	- `ReplaceCaseInsensitive(string str, string oldValue, string newValue)` (method)
	- `ReplaceIfEndsWith(string content, string suffix, string replacement)` (method)
	- `ReplaceLastOccurrence(string source, string find, string replace)` (method)
	- `ReplaceSpecialCharacters(string str, string replacementCharacters)` (method)
	- `ReplaceWhileExists(string str, string oldValue, string newValue)` (method)
	- `ReplaceWordChars(string text)` (method)
	- `Right(string str, int length)` (method)
	- `Round(DateTime datetime, TimeSpan roundingInterval)` (method)
	- `Round(TimeSpan time, TimeSpan roundingInterval)` (method)
	- `Round(TimeSpan time, TimeSpan roundingInterval, MidpointRounding roundingType)` (method)
	- `SafeSubstring(string str, int startIndex, int maxLength)` (method)
	- `ScrubEncodedStringForXSSObjects(string encodedString)` (method)
	- `Sha1Hash(string str)` (method)
	- `Sha256Hash(string str)` (method)
	- `Singularize(string str)` (method)
	- `SplitCase(string str)` (method)
	- `SplitDelimitedValues(string str, bool whitespace = True)` (method)
	- `SplitDelimitedValues(string str, string delimiter)` (method)
	- `SplitDelimitedValues(string str, string delimiter, StringSplitOptions options)` (method)
	- `SplitIntoChunks(string str, int maxChunkSize)` (method)
	- `StandardizeQuotes(string str)` (method)
	- `StartOfDay(DateTime dateTime)` (method)
	- `StartOfMonth(DateTime dt)` (method)
	- `StartOfWeek(DateTime dt, DayOfWeek startOfWeek)` (method)
	- `StartOfYear(DateTime dateTime)` (method)
	- `StringToIntList(string str)` (method)
	- `StripHtml(string str)` (method)
	- `SubstringSafe(string str, int startIndex)` (method)
	- `SubstringSafe(string str, int startIndex, int maxLength)` (method)
	- `SundayDate(DateTime dt)` (method)
	- `SundayDate(DateTime dt, DayOfWeek startOfWeek = 1)` (method)
	- `ToElapsedString(DateTime dateTime, bool condensed = False, bool includeTime = True)` (method)
	- `ToElapsedString(DateTime? dateTime, bool condensed = False, bool includeTime = True)` (method)
	- `ToISO8601DateString(DateTime dateTime)` (method)
	- `ToISO8601DateString(DateTime? dateTime)` (method)
	- `ToJavascriptMilliseconds(DateTime dateTime)` (method)
	- `ToJavaScriptValue(bool value)` (method)
	- `ToJson(object obj)` (method)
	- `ToJson(object obj, Formatting format)` (method)
	- `ToJson(object obj, Formatting format, bool ignoreErrors)` (method)
	- `ToKeyValuePairList(string input)` (method)
	- `ToMemoryStream(string str)` (method)
	- `ToMonthDayString(DateTime dateTime)` (method)
	- `ToPossessive(string str)` (method)
	- `ToRelativeDateString(DateTime dateTime, int? maxDays)` (method)
	- `ToRelativeDateString(DateTime? dateTime, int? maxDays)` (method)
	- `ToRfc822DateTime(DateTime dateTime)` (method)
	- `ToRockDateTimeOffset(DateTime dateTime)` (method)
	- `ToShortDateTimeString(DateTime dt)` (method)
	- `ToStreamReader(string str)` (method)
	- `ToStringOrDefault(object obj, string defaultValue)` (method)
	- `ToStringSafe(object obj)` (method)
	- `TotalMonths(DateTime end, DateTime start)` (method)
	- `TotalYears(DateTime end, DateTime start)` (method)
	- `ToTimeString(TimeSpan timespan)` (method)
	- `ToTrueFalse(bool value)` (method)
	- `ToYesNo(bool value)` (method)
	- `Truncate(string str, int maxLength)` (method)
	- `Truncate(string str, int maxLength, bool addEllipsis)` (method)
	- `WordCount(string str)` (method)
	The following members were removed from `Rock.Financial.FinancialStatementGeneratorOptions.FinancialStatementIndividualSaveOptions`:
	- `Rock.Financial.FinancialStatementGeneratorOptions.FinancialStatementIndividualSaveOptions.OverwriteDocumentsOfThisTypeCreatedOnSameDate` (property)
	The following members were removed from `Rock.Lava.LavaElementAttributes`:
	- `GetBooleanValue(string name, bool? defaultValue)` (method)
	- `GetDateTimeValue(string name, DateTime? defaultValue)` (method)
	- `GetIntegerValue(string name, int? defaultValue)` (method)
	- `GetStringValue(string name, string defaultValue, bool trimWhiteSpace = True)` (method)
	The following members were removed from `Rock.Lava.Shortcodes.LavaShortcodeMetadataAttribute.`:
	- `ctor(string name, string tagName, string description, string documentation, string parameters, string enabledCommands)` (method)
	The following members were removed from `Rock.Lava.WebsiteLavaTemplateCacheService`:
	- `Get(ILavaEngine engine, string key, string content)` (method)
	The following members were removed from `Rock.Model.AIAgentSession`:
	- `Rock.Model.AIAgentSession.RelatedEntityId` (property)
	- `Rock.Model.AIAgentSession.RelatedEntityType` (property)
	- `Rock.Model.AIAgentSession.RelatedEntityTypeId` (property)
	The following members were removed from `Rock.Model.AnalyticsSourceDate`:
	- `Rock.Model.AnalyticsSourceDate.CalendarMonthNameAbbrevated` (property)
	- `Rock.Model.AnalyticsSourceDate.FiscalMonthAbbrevated` (property)
	The following members were removed from `Rock.Model.AttendanceCodeService`:
	- `Rock.Model.AttendanceCodeService.noGood` (field)
	The following members were removed from `Rock.Model.AttendanceService`:
	- `GetAttendanceAnalyticsAttendeeDates(List<int> groupIds, DateTime? start, DateTime? end, List<int> campusIds, bool? includeNullCampusIds, List<int> scheduleIds)` (method)
	- `GetAttendanceAnalyticsAttendeeFirstDates(List<int> GroupTypeIds, List<int> groupIds, DateTime? start, DateTime? end, List<int> campusIds, bool? includeNullCampusIds, List<int> scheduleIds)` (method)
	- `GetAttendanceAnalyticsAttendeeLastAttendance(List<int> groupIds, DateTime? start, DateTime? end, List<int> campusIds, bool? includeNullCampusIds, List<int> scheduleIds)` (method)
	- `GetAttendanceAnalyticsAttendees(List<int> groupIds, DateTime? start, DateTime? end, List<int> campusIds, bool? includeNullCampusIds, List<int> scheduleIds, bool? IncludeParentsWithChild, bool? IncludeChildrenWithParents)` (method)
	- `GetAttendanceAnalyticsNonAttendees(List<int> GroupTypeIds, List<int> groupIds, DateTime? start, DateTime? end, List<int> campusIds, bool? includeNullCampusIds, List<int> scheduleIds, bool? IncludeParentsWithChild, bool? IncludeChildrenWithParents)` (method)
	- `ScheduledPersonRemove(int attendanceId)` (method)
	- ``SendScheduleConfirmationSystemEmails(IQueryable<Attendance> sendConfirmationAttendancesQuery, out List`1& errorMessages)`` (method)
	- `SendScheduleReminderSystemEmails(IQueryable<Attendance> sendReminderAttendancesQuery)` (method)
	The following members were removed from `Rock.Model.Communication`:
	- `Rock.Model.Communication.SMSFromDefinedValue` (property)
	- `Rock.Model.Communication.SMSFromDefinedValueId` (property)
	The following members were removed from `Rock.Model.CommunicationRecipientResponse`:
	- `Rock.Model.CommunicationRecipientResponse.BinaryFileGuids` (property)
	The following members were removed from `Rock.Model.CommunicationResponse`:
	- `Rock.Model.CommunicationResponse.RelatedSmsFromDefinedValueId` (property)
	The following members were removed from `Rock.Model.CommunicationResponseService`:
	- `GetCommunicationConversation(int personAliasId, int relatedSmsFromDefinedValueId)` (method)
	- `GetCommunicationConversationForPerson(int personId, int relatedSmsFromDefinedValueId)` (method)
	- `GetCommunicationResponseRecipients(int relatedSmsFromDefinedValueId, DateTime startDateTime, bool showReadMessages, int maxCount)` (method)
	- `GetCommunicationResponseRecipients(int relatedSmsFromDefinedValueId, DateTime startDateTime, bool showReadMessages, int maxCount, int? personId)` (method)
	- `GetCommunicationResponseRecipients(int relatedSmsFromDefinedValueId, DateTime startDateTime, int maxCount, CommunicationMessageFilter filter, int? personId)` (method)
	- `GetResponsesFromPersonAliasIdForSMSNumber(int fromPersonAliasId, int relatedSmsFromDefinedValueId)` (method)
	- `UpdateReadPropertyByFromPersonAliasId(int fromPersonAliasId, int relatedSmsFromDefinedValueId)` (method)
	- `UpdateReadPropertyByFromPersonId(int fromPersonId, int relatedSmsFromDefinedValueId)` (method)
	The following members were removed from `Rock.Model.CommunicationService`:
	- `CreateSMSCommunication(Person fromPerson, int? toPersonAliasId, string message, DefinedValueCache fromPhone, string responseCode, string communicationName)` (method)
	The following members were removed from `Rock.Model.CommunicationService.CreateSMSCommunicationArgs`:
	- `Rock.Model.CommunicationService.CreateSMSCommunicationArgs.FromPhone` (property)
	The following members were removed from `Rock.Model.CommunicationTemplate`:
	- `Rock.Model.CommunicationTemplate.SMSFromDefinedValue` (property)
	- `Rock.Model.CommunicationTemplate.SMSFromDefinedValueId` (property)
	The following members were removed from `Rock.Model.EventItem`:
	- `GetAlternateEntityIds(RockContext rockContext)` (method)
	The following members were removed from `Rock.Model.FinancialPaymentDetail`:
	- `Rock.Model.FinancialPaymentDetail.HistoryChangeList` (property)
	The following members were removed from `Rock.Model.FinancialPaymentDetailService`:
	- `DeleteOrphanedFinancialPaymentDetail(DbEntityEntry referencingEntry)` (method)
	The following members were removed from `Rock.Model.FinancialPledgeService`:
	- `GetPledgeAnalytics(int accountId, DateTime? start, DateTime? end, decimal? minAmountPledged, decimal? maxAmountPledged, decimal? minComplete, decimal? maxComplete, decimal? minAmountGiven, decimal? maxAmountGiven, bool includePledges, bool includeGifts)` (method)
	The following members were removed from `Rock.Model.FinancialScheduledTransaction`:
	- `Rock.Model.FinancialScheduledTransaction.HistoryChangeList` (property)
	The following members were removed from `Rock.Model.FinancialScheduledTransactionDetail`:
	- `Rock.Model.FinancialScheduledTransactionDetail.HistoryChangeList` (property)
	The following members were removed from `Rock.Model.FinancialTransaction`:
	- `Rock.Model.FinancialTransaction.BatchHistoryChangeList` (property)
	- `Rock.Model.FinancialTransaction.HistoryChangeList` (property)
	The following members were removed from `Rock.Model.FinancialTransactionDetail`:
	- `Rock.Model.FinancialTransactionDetail.HistoryChangeList` (property)
	The following members were removed from `Rock.Model.FinancialTransactionDetailService`:
	- `GetGivingAnalyticsAccountTotals(DateTime? start, DateTime? end, List<int> accountIds, List<int> currencyTypeIds, List<int> sourceTypeIds, List<int> transactionTypeIds)` (method)
	- `GetGivingAnalyticsFirstLastEverDates()` (method)
	- `GetGivingAnalyticsPersonSummary(DateTime? start, DateTime? end, decimal? minAmount, decimal? maxAmount, List<int> accountIds, List<int> currencyTypeIds, List<int> sourceTypeIds, List<int> transactionTypeIds)` (method)
	- `GetGivingAnalyticsTransactionData(DateTime? start, DateTime? end, List<int> accountIds, List<int> currencyTypeIds, List<int> sourceTypeIds, List<int> transactionTypeIds)` (method)
	The following members were removed from `Rock.Model.FinancialTransactionService`:
	- `GetGivingAutomationMonthlyAccountGivingHistoryFromJson(string json)` (method)
	The following members were removed from `Rock.Model.Group`:
	- `Rock.Model.Group.HistoryChangeList` (property)
	The following members were removed from `Rock.Model.GroupRequirement`:
	- `PersonMeetsGroupRequirement(int personId, int groupId, int? groupRoleId)` (method)
	The following members were removed from `Rock.Model.LocationService`:
	- `ValidateAddressRequirements(Location location, out String& errorMessage)` (method)
	The following members were removed from `Rock.Model.Person`:
	- `GetAge(DateTime? birthDate)` (method)
	- `GetPersonPhotoUrl(int? personId, int? photoId, int? age, Gender gender, Nullable<Guid> recordTypeValueGuid, Nullable<AgeClassification> ageClassification, int? maxWidth, int? maxHeight)` (method)
	The public class `Rock.Model.RangeValue<T>` was removed.
	The following members were removed from `Rock.Model.RegistrationService`:
	- `GetRegistrationContext(int registrationInstanceId, out String& errorMessage)` (method)
	The following members were removed from `Rock.Model.RestControllerService`:
	- `GetApiId(MethodInfo methodInfo, string httpMethod, string controllerName)` (method)
	The following members were removed from `Rock.Model.ServiceJobService`:
	- `RunNow(ServiceJob job, out String& errorMessage)` (method)
	The following members were removed from `Rock.Model.SystemCommunication`:
	- `Rock.Model.SystemCommunication.SMSFromDefinedValue` (property)
	- `Rock.Model.SystemCommunication.SMSFromDefinedValueId` (property)
	The following members were removed from `Rock.ObjectExtensions`:
	- `IsNotNull<T>(T value)` (method)
	- `IsNull<T>(T value)` (method)
	The public class `Rock.Reporting.Dashboard.LineBarPointsChartDashboardWidget` was removed.
	The following members were removed from `Rock.Rest.Controllers.AttendancesController`:
	- `ScheduledPersonSendConfirmationEmail(int attendanceId)` (method)
	The following members were removed from `Rock.Rest.Controllers.BlocksController`:
	- `BlockAction(Guid blockGuid, string actionName)` (method)
	- `BlockActionAsPost(string blockGuid, string actionName, string parameters)` (method)
	The following members were removed from `Rock.Rest.Controllers.ExceptionLogsController`:
	- `GetChartData()` (method)
	The following members were removed from `Rock.Rest.Controllers.FinancialAccountsController`:
	- `GetChildrenBySearchTermObsolete(bool activeOnly, bool displayPublicName, string searchTerm)` (method)
	- `GetChildrenObsolete(int id, bool activeOnly)` (method)
	- `GetChildrenObsolete(int id, bool activeOnly, bool displayPublicName, GetCountsType countsType = 0)` (method)
	- `GetInactiveObsolete(bool displayPublicName)` (method)
	The following members were removed from `Rock.RockDateTime`:
	- `Rock.RockDateTime.CurrentGraduationDate` (property)
	- `Rock.RockDateTime.CurrentGraduationYear` (property)
	The following members were removed from `Rock.Security.Encryption`:
	- `DecryptString(string cipherText, string dataEncryptionKey)` (method)
	- `EncryptString(string plainText, string dataEncryptionKey)` (method)
	The following members were removed from `Rock.SystemGuid.BlockType`:
	- `Rock.SystemGuid.BlockType.OBSIDIAN_WORKFLOW_ENTRY` (field)
	The following members were removed from `Rock.SystemGuid.DefinedValue`:
	- `Rock.SystemGuid.DefinedValue.PERSON_CONNECTION_STATUS_WEB_PROSPECT` (field)
	The following members were removed from `Rock.SystemGuid.Group`:
	- `Rock.SystemGuid.Group.GROUP_MOBILE_APP` (field)
	The following members were removed from `Rock.SystemGuid.ServiceJob`:
	- `Rock.SystemGuid.ServiceJob.GIVING_ANALYTICS` (field)
	- `Rock.SystemGuid.ServiceJob.REBUILD_STREAK` (field)
	The following members were removed from `Rock.SystemGuid.SystemCommunication`:
	- `Rock.SystemGuid.SystemCommunication.DIGITAL_SIGNATURE_INVITE` (field)
	The following members were removed from `Rock.SystemKey.GroupTypeAttributeKey`:
	- `Rock.SystemKey.GroupTypeAttributeKey.CHECKIN_GROUPTYPE_ALLOW_CHECKOUT` (field)
	The following members were removed from `Rock.SystemKey.SystemSetting`:
	- `Rock.SystemKey.SystemSetting.REDIS_DATABASE_NUMBER` (field)
	- `Rock.SystemKey.SystemSetting.REDIS_ENABLE_CACHE_CLUSTER` (field)
	- `Rock.SystemKey.SystemSetting.REDIS_ENDPOINT_LIST` (field)
	- `Rock.SystemKey.SystemSetting.REDIS_PASSWORD` (field)
	The public class `Rock.Tasks.AddCommunicationRecipients` was removed.
	The public class `Rock.Tasks.AddNewMetaphones` was removed.
	The public class `Rock.Tasks.LaunchGroupMemberPlacedElsewhereWorkflow` was removed.
	The public class `Rock.Tasks.LaunchWorkflow` was removed.
	The public class `Rock.Tasks.LaunchWorkflows` was removed.
	The public class `Rock.Tasks.ProcessConnectionRequestActivityChange` was removed.
	The public class `Rock.Tasks.ProcessEntityTypeIndex` was removed.
	The public class `Rock.Tasks.RegisterRestControllers` was removed.
	The public class `Rock.Tasks.UpdateDataViewStatistics` was removed.
	The public class `Rock.Tasks.UpdatePaymentStatusFinancialScheduledTransactions` was removed.
	The public class `Rock.Transactions.AchievementAttemptChangeTransaction` was removed.
	The public class `Rock.Transactions.AchievementsProcessingTransaction` was removed.
	The public class `Rock.Transactions.AuditTransaction` was removed.
	The public class `Rock.Transactions.BulkIndexEntityTypeTransaction` was removed.
	The public class `Rock.Transactions.ConnectionRequestChangeTransaction` was removed.
	The public class `Rock.Transactions.DeleteAttributeBinaryFile` was removed.
	The public class `Rock.Transactions.EntityChangeWorkflowTriggerTransactionBase<TEntity, TTrigger>` was removed.
	The public class `Rock.Transactions.GroupAttendedTransaction` was removed.
	The public class `Rock.Transactions.GroupMemberChangeTransaction` was removed.
	The public class `Rock.Transactions.GroupScheduleCancellationTransaction` was removed.
	The public interface `Rock.Transactions.ITransactionWithProgress` was removed.
	The public class `Rock.Transactions.PageRenameTransaction` was removed.
	The public class `Rock.Transactions.PersonViewTransaction` was removed.
	The following members were removed from `Rock.Transactions.RockQueue`:
	- `IsExecuting<T>() where T : ITransaction` (method)
	- `IsInQueue<T>() where T : ITransaction` (method)
	- `Rock.Transactions.RockQueue.CurrentlyExecutingTransaction` (property)
	- `Rock.Transactions.RockQueue.CurrentlyExecutingTransactionProgress` (property)
	- `Rock.Transactions.RockQueue.TransactionQueue` (property)
	The public class `Rock.Transactions.RunDataViewTransaction` was removed.
	The following members were removed from `Rock.Transactions.RunJobNowTransaction.`:
	- `ctor(int jobId, Dictionary<string, string> jobDataMapDictionary)` (method)
	The public class `Rock.Transactions.RunReportTransaction` was removed.
	The public class `Rock.Transactions.SendCommunicationApprovalEmail` was removed.
	The public class `Rock.Transactions.SendCommunicationTransaction` was removed.
	The public class `Rock.Transactions.SendPaymentReceipts` was removed.
	The public class `Rock.Transactions.SendRegistrationConfirmationTransaction` was removed.
	The public class `Rock.Transactions.SendRegistrationNotificationTransaction` was removed.
	The public class `Rock.Transactions.ShortLinkTransaction` was removed.
	The public class `Rock.Transactions.StepChangeTransaction` was removed.
	The public class `Rock.Transactions.StreakTypeExclusionChangeTransaction` was removed.
	The public class `Rock.Transactions.StreakTypeRebuildTransaction` was removed.
	The public class `Rock.Transactions.UpdateFacebookFriends` was removed.
	The public class `Rock.Transactions.UpdatePersonsTopSignal` was removed.
	The public class `Rock.Transactions.UserLastActivityTransaction` was removed.
	The public class `Rock.Transactions.WorkflowTriggerTransaction` was removed.
	The following members were removed from `Rock.Web.Cache.FieldTypeCache`:
	- `Rock.Web.Cache.FieldTypeCache.IconCssClass` (property)
	The following members were removed from `Rock.Web.Cache.RockCache`:
	- `Rock.Web.Cache.RockCache.IsCacheSerialized` (property)
	- `Rock.Web.Cache.RockCache.ObjectCacheKeyReferences` (property)
	- `Rock.Web.Cache.RockCache.StringCacheKeyReferences` (property)
	The public class `Rock.Web.UI.Controls.BarChart` was removed.
	The following members were removed from `Rock.Web.UI.Controls.ChartJsChart`:
	- `GetCategorySeriesFromChartData(IEnumerable<IChartData> chartDataItems)` (method)
	- `GetChartStyle()` (method)
	- `GetTimeSeriesFromChartData(IEnumerable<IChartData> chartDataItems)` (method)
	- `Rock.Web.UI.Controls.ChartJsChart.EndDate` (property)
	- `Rock.Web.UI.Controls.ChartJsChart.StartDate` (property)
	The public class `Rock.Web.UI.Controls.ChartOptions` was removed.
	The following members were removed from `Rock.Web.UI.Controls.FinancialGatewayPicker`:
	- `Rock.Web.UI.Controls.FinancialGatewayPicker.ShowAll` (property)
	The public class `Rock.Web.UI.Controls.FlotChart` was removed.
	The public class `Rock.Web.UI.Controls.LineChart` was removed.
	The public class `Rock.Web.UI.Controls.PieChart` was removed.
	The following members were removed from `Rock.Web.UI.Controls.SecurityFieldTemplate.`:
	- `ctor(Page page, int entityTypeId, string titleField)` (method)
	The following members were removed from `Rock.Web.UI.Controls.StructureContentEditor`:
	- `Rock.Web.UI.Controls.StructureContentEditor.HtmlContent` (property)
	The public interface `Rock.Web.UI.IDetailBlock` was removed.

### 20.0.1 April 8, 2026

- The following legacy "Electronic Signature" methods, properties or classes -- originally obsoleted in Rock v14 -- were removed from the Rock:
	- `Rock.Model.SignatureDocumentTemplateService.CancelDocument` (method)
			- `Rock.Model.SignatureDocumentTemplateService.SendDocument` (method)
			- `Rock.Model.SignatureDocumentTemplateService.UpdateDocumentStatus` (method)
			- The public class `Rock.Jobs.ProcessSignatureDocuments` was removed.
			- The public class `Rock.Security.DigitalSignatureComponent` was removed.
			- The public class `Rock.Security.DigitalSignatureContainer` was removed.
			- The public class `Rock.Tasks.ProcessSendDigitalSignatureRequest` was removed.
			- The public class `Rock.Tasks.UpdateDigitalSignatureDocument` was removed.
			- The public class `Rock.Transactions.SendDigitalSignatureRequestTransaction` was removed.
			- The public class `Rock.Transactions.UpdateDigitalSignatureDocumentTransaction` was removed.
	The following method signatures were changed on `Rock.Rest.v2.Models.PeopleController`:
	- `public IHttpActionResult PostItem(Person value)` → `public IHttpActionResult PostItem(Person value, bool createPersonIfMissing = True)`
	The public class `Rock.Blocks.Types.Mobile.Cms.VoiceAgentInitialData` was removed.
	The following members were removed from `Rock.Common.Mobile.Blocks.Engagement.OutreachDashboard.ContactTouchpointBag`:
	- `Rock.Common.Mobile.Blocks.Engagement.OutreachDashboard.ContactTouchpointBag.TouchpointViewBag` (property)
	The following members were removed from `Rock.Model.ConnectionRequest`:
	- `Rock.Model.ConnectionRequest.CelebrationText` (property)
	The public enum `Rock.Model.ReminderNotificationType` was moved to Rock.Enums (should not be a breaking change).

## Rock 19.0 Released May 5, 2026

---

**Developers — starting with v19.0**

- **DotLiquid Removal Completed**
	Your custom projects should no longer reference `Rock.Lava.ILiquidizable`, `DotLiquid`, etc.
- **DDay.iCal.dll Removal Completed**
	Your custom projects should no longer reference `DDay.iCal`.
- **Enums Moved to Rock.Enums**
	Your custom projects using core enums will need to reference `Rock.Enums` and be recompiled.
- **Internal Cleanup**
	Several internal, developer-only block types were removed in this release. These tools were not intended for production or ministry use, and their removal should have no functional impact.
	The removed block types include:
	- StarkDynamicAttributes
		- Developer Environment Info
		- Cache Reader
- **Group Member Requirements Logic**
	Updated internal Group Member Requirements logic so the `RequirementMetDateTime` value is preserved when a requirement is met with a warning, rather than being cleared.
- The legacy SMS Phone Numbers Defined Type has been fully removed from the system. This functionality has been replaced by the `SystemPhoneNumber` model, which was introduced in a previous version to provide a more robust and maintainable architecture for managing system phone numbers.
- The following legacy "Electronic Signature" methods, properties or classes -- originally obsoleted in Rock v14 -- were removed from the Rock:
	- `Rock.Model.SignatureDocumentTemplateService.CancelDocument` (method)
		- `Rock.Model.SignatureDocumentTemplateService.SendDocument` (method)
		- `Rock.Model.SignatureDocumentTemplateService.UpdateDocumentStatus` (method)
		- The public class `Rock.Jobs.ProcessSignatureDocuments` was removed.
		- The public class `Rock.Security.DigitalSignatureComponent` was removed.
		- The public class `Rock.Security.DigitalSignatureContainer` was removed.
		- The public class `Rock.Tasks.ProcessSendDigitalSignatureRequest` was removed.
		- The public class `Rock.Tasks.UpdateDigitalSignatureDocument` was removed.
		- The public class `Rock.Transactions.SendDigitalSignatureRequestTransaction` was removed.
		- The public class `Rock.Transactions.UpdateDigitalSignatureDocumentTransaction` was removed.

### 19.0.8

- The following legacy "Electronic Signature" methods, properties or classes -- originally obsoleted in Rock v14 -- were removed from the Rock:
	- `Rock.Model.SignatureDocumentTemplateService.CancelDocument` (method)
			- `Rock.Model.SignatureDocumentTemplateService.SendDocument` (method)
			- `Rock.Model.SignatureDocumentTemplateService.UpdateDocumentStatus` (method)
			- The public class `Rock.Jobs.ProcessSignatureDocuments` was removed.
			- The public class `Rock.Security.DigitalSignatureComponent` was removed.
			- The public class `Rock.Security.DigitalSignatureContainer` was removed.
			- The public class `Rock.Tasks.ProcessSendDigitalSignatureRequest` was removed.
			- The public class `Rock.Tasks.UpdateDigitalSignatureDocument` was removed.
			- The public class `Rock.Transactions.SendDigitalSignatureRequestTransaction` was removed.
			- The public class `Rock.Transactions.UpdateDigitalSignatureDocumentTransaction` was removed.

### 19.0.7 March 18, 2026

- The following members were removed from `Rock.Model.Contact`:
	- `Rock.Model.Contact.ConnectionNote` (property)
			- `Rock.Model.Contact.PrayerNote` (property)
	The following enums were moved from `Rock.dll` to `Rock.Enums.dll` The namespace remains the same. Code using this enum will need to reference the new dll and be recompiled:
	- `Rock.Utility.CreateConnectionRequestOptions`
			- `Rock.Utility.FamilyLimits`
	The following members were removed from `Rock.Common.Mobile.Blocks.Engagement` for `AddContact`, `ContactProfile`, and `TouchpointDetail`:
	- `Rock.Common.Mobile.Blocks.Engagement.AddContact.SaveContactBag.ConnectionNote` (property)
			- `Rock.Common.Mobile.Blocks.Engagement.AddContact.SaveContactBag.PrayerNote` (property)
			- `Rock.Common.Mobile.Blocks.Engagement.ContactProfile.ContactProfileBag.ConnectionNote` (property)
			- `Rock.Common.Mobile.Blocks.Engagement.ContactProfile.ContactProfileBag.PrayerNote` (property)
			- `Rock.Common.Mobile.Blocks.Engagement.ContactProfile.UpdateContactNoteAndCadence.ConnectionNote` (property)
			- `Rock.Common.Mobile.Blocks.Engagement.ContactProfile.UpdateContactNoteAndCadence.PrayerNote` (property)
			- `Rock.Common.Mobile.Blocks.Engagement.TouchpointDetail.UpdateContactConnectionBag.ConnectionNote` (field)
			- `Rock.Common.Mobile.Blocks.Engagement.TouchpointDetail.UpdateContactPrayerBag.PrayerNote` (field)
	The following method signatures were changed on `Rock.Rest.v2.McpController.`:
	- `public  .ctor(IMcpServer mcpServer, IChatAgentBuilder agentBuilder)` → `public  .ctor(IServiceProvider serviceProvider)`

### 19.0.6 February 25, 2026

- `Rock.Data.DbContext.WrapTransaction( Action action )` is now `virtual` and `Rock.Data.DbContext.WrapTransactionIf( Func<bool> action )` is now `virtual`.
	The following items related to SystemEmail, which was obsoleted in Rock v10 (replaced with SystemCommunication), have been removed:
	- `Rock.Attribute.SystemEmailFieldAttribute` (class)
			- `Rock.Field.Types.SystemEmailFieldType` (class)
			- `Rock.Model.Communication.SystemEmail` (class)
			- `Rock.Model.Communication.SystemEmailService` (class)
			- `Rock.Model.Communication.SystemEmailConfiguration` (class)
			- `Rock.Model.Communication.SystemEmailExtensionMethods` (class)
			- `Rock.Communication.RockEmailMessage( SystemEmail systemEmail )` (constructor)
			- `Rock.Model.SignatureDocumentTemplate.InviteSystemEmailId` and `InviteSystemEmail` (properties)
			- `Rock.Model.GroupSync.ExitSystemEmailId` and `ExitSystemEmail` (properties)
			- `Rock.Model.GroupSync.WelcomeSystemEmailId` and `WelcomeSystemEmail` (properties)
			- `Rock.Model.GroupType.ScheduleConfirmationSystemEmailId` and `ScheduleConfirmationSystemEmail` (properties)
			- `Rock.Model.GroupType.ScheduleReminderSystemEmailId` and `ScheduleReminderSystemEmail` (properties)
			- `Rock.Model.WorkflowActionForm.NotificationSystemEmailId` and `NotificationSystemEmail` (properties)
			- `Rock.SystemGuid.Page.SYSTEM_EMAIL_CATEGORIES_SYSTEM_EMAILS` (const)
			- `Rock.Web.Cache.GroupTypeCache.ScheduleConfirmationSystemEmailId` (property)
			- `Rock.Web.Cache.GroupTypeCache.ScheduleReminderSystemEmailId` (property)
			- `Rock.Web.Cache.WorkflowActionFormCache.NotificationSystemEmailId` (property)
			- `Rock.Rest.Controllers.SystemEmailsController` (class)
	The following related items (obsoleted in Rock v15) have been removed:
	- `Rock.Communication.Medium.Sms` `public static DefinedValueCache FindFromPhoneDefinedValue( string phoneNumber )`
			- `Rock.Communication.Medium.Sms` `public static DefinedValueCache FindRockSMSPhoneDefinedValue( string phoneNumber )`
			- `Rock.Model.SystemPhoneNumberService` `public static void DeleteLegacyPhoneNumber( SystemPhoneNumber systemPhoneNumber )`
			- `Rock.SystemGuid.DefinedType.COMMUNICATION_SMS_FROM` (const)
	The following enums were moved from Rock.dll to Rock.Enums.dll:
	- `Rock.Model.ConnectionState`
			- `Rock.Model.GroupLocationPickerMode`
			- `Rock.Model.GroupMemberWorkflowTriggerType`
			- `Rock.Model.ScheduleType`

### 19.0.5 February 4, 2026

- The `Rock.Common.Mobile.Blocks.Engagement.BeaconDashboard` (added recently in v19) is renamed to `Rock.Common.Mobile.Blocks.Engagement.OutreachDashboard.`. Similarly other classes `BeaconDashboard` are renamed to `OutreachDashboard`.
	The RockBlockTypeExtension's `GetCurrentPageUrl(RockBlockType block, bool skipExistingParameters, IDictionary queryParams)` method signature added in 19.0.4 is changed to `GetCurrentPageUrl(RockBlockType block, IDictionary queryParams, bool skipExistingParameters)`.
	The `public enum GivingJourneyStage` value for `Occasional` was changed from a 2 to a 3 and the `Consistent` was changed from a 3 to a 2.
	The public string model property `Rock.Model.ConnectionRequest.CelebrationNote` was removed and a collection property `ConnectionRequestStatusHistories` was added.
	The property `Rock.Model.Person.OutreachTouchpointNotificationsEnabled` was removed and `Rock.Model.Person.OutreachTouchpointGenerationEnabled` was added.
	The public class `Rock.Utility.Settings.Giving.GiverBin` was removed.
	The `Rock.Utility.Settings.Giving.GivingClassificationSettings.GiverBins` property was removed and `Rock.Utility.Settings.Giving.GivingClassificationSettings.FiltersChanged` was added.

### 19.0.3 December 22, 2025

- The User-Defined Table Type `EntityIdList` has been deprecated and will no longer be supported.
	The `HtmlContent.BlockId` is no longer required. This change allowed us to fix an issue where deleting an HTML Content block could also remove shared content for other linked blocks using the same Context Name block setting value. Rock now preserves shared content by allowing the source HtmlContent's BlockId to be null when a block is deleted.
	The `PersistedDataset.RefreshIntervalMinutes` property is obsolete. It has been replaced by the standardized `PersistedScheduleIntervalMinutes` property, and all existing data has been migrated accordingly.

### 19.0.2 December 2, 2025

- The following assembly, obsoleted in Rock v9, [was removed](https://github.com/SparkDevNetwork/Rock/commit/6de1dc09148993de63315bd46c69ac14eb8da15a) from Rock:
	- DDay.iCal.dll

### 19.0.1 November 12, 2025

- The properties `SecretKey` and `SiteKey` in the Captcha control `Rock.Web.UI.Controls.Captcha` have been removed.
	In the class `Rock.Rest/v2/ControlsController.cs`, the method `public IHttpActionResult CaptchaControlValidateToken(CaptchaControlValidateTokenOptionsBag options)` has been renamed to `public Task CaptchaValidateToken(CaptchaValidateTokenOptionsBag options)`. Similarly, the method `public IHttpActionResult CaptchaControlGetConfiguration()` in the same class has been renamed to `public IHttpActionResult CaptchaGetConfiguration()`. Any code referencing these two method would need to be recompiled.
	This release marks the final removal of DotLiquid with the removal of `Rock.Lava.ILiquidizable` and `Rock.Lava.Blocks.RockLavaBlockBase `. See the 2023 article called [Ending Support for "DotLiquid" Lava Engine](https://community.rockrms.com/connect/ending-support-for-dotliquid-lava-engine) for more information about why DotLiquid was removed.

## Rock 18.1 Released December 8, 2025

---

Developers, starting with v18.0...
- **DotLiquid** -
	Any plugin that uses Lava and has not been recompiled against Rock v18 will no longer function in Rock v19. Please ensure your plugins are updated and rebuilt to remove any dependencies on DotLiquid.
- **Migration of eRA History to Steps** -
	We’ve introduced a new post-update job: **“Rock Update Helper v18.0 – Migrate eRA Records to Step Records”**. This job transfers existing eRA records from the **History** table into the **Steps** table under the newly created *eRA Step Type*. Going forward, the **Family Analytics** job will create or update eRA entries directly in the Steps table.
- **Removed System.Interactive.Async.dll** -
	We've removed this legacy DLL from Rock. It provided a C# type that has been part of the standard Microsoft libraries since late 2019 so it is no longer required.
- **Fixed Universal Field Types with complex configuration attributes.**
	We've fixed a bug when configuration Universal Field Types that had complex configuration attributes, meaning things like CampusField. When editing an attribute using one of these universal field types in an Obsidian block, the wrong configuration value was saved. This caused the public JSON data to be saved instead of the internal value, which was usually just a guid. This has been fixed, but may impact your field types if they were available for user-editing in an Obsidian block. Simple configuration attributes such as text or integer were not affected.
- Version 18 introduces a completely new theme for the internal Rock homepage, located in the Themes\\RockNextGen folder. If you had custom files in the original Themes\\Rock folder, they likely won’t be available in the new theme—especially if you were referencing them using the `~~/` notation.
- The new Obsidian Communication List Block does not support Custom Columns. This decision was made to ensure optimal performance and stability, as the flexibility of Custom Columns in the legacy version introduced significant performance overhead when working with large datasets.
- During the upgrade to Rock v18, you may see an exception when Rock attempts to compile `LavaShortcodeList.ascx.cs`. This is expected—this WebForms block was chopped in v18 and is no longer used. The error occurs briefly until the Chop Job finishes removing the obsolete block files. Once the job completes, the exception will no longer appear, and no action is required.
- Starting in v18, the internal site logo is now defined on the RockNextGen theme instead of the site. This allows the logo to be available as a CSS variable.

## Rock 17.2 Released July 22, 2025

---

Developers, starting with v17.2...
- **Index Fill Factor** -
	The database index fill factor was increased from 80% to 100% to reduce table size and improve maintenance performance. In the past, this was changed due to a common practice of reserving space to reduce page splits in the tables but, upon further research, it is an [industry recommendation](https://www.youtube.com/watch?v=uI6qyR4Ox3w) to fill the pages to 100%. This only changes a FILLFACTOR of 80 since there may be purposeful reductions in FILLFACTOR for values less than 80. We do not want to override these if they are intentionally reduced.
- **Improved Support for Third-Party Background Check Providers** -
	The `BackgroundCheckComponent` base class and internal logic have been updated to support third-party integrations with the core **Background Check Document** person attribute and its associated *FieldType*. Previously, this field was primarily limited to use with Protect My Ministry and Checkr. Starting in v17.2, *other* third-party providers can save values to this attribute by supplying a string in the format:
	\[EntityTypeId\],\[BinaryFile.Guid\]For more context, see [issue #6337](https://github.com/SparkDevNetwork/Rock/issues/6337).

## Rock 17.0 Released April 21, 2025

---

Developers, starting with v17.0...
- **Obsolete Method/Property Removal** -
	All RockObsolete methods and properties v12 and earlier are being removed. You should have already been getting warnings in VisualStudio to fix those issues in your code/plugins.
	The `/api/FinancialTransactions/` endpoints which were marked as obsolete in v12.4 have been removed in v17.0. The code referencing these endpoints need to use the `/api/FinancialGivingStatement/` endpoints instead
	The `/api/FinancialGivingStatement/{personId}` and `/api/GivingStatement/{personId}` endpoints no longer accept the parameters `templateDefinedValueId` and `hideRefundedTransactions`. Also, from v17.0, `financialStatementTemplateId` is a mandatory parameter for these endpoints.
	For a more complete list please visit [this page](https://community.rockrms.com/page/3164).
- **Visual Studio 2019 (and older) No Longer Supported** -
	Since it's 2025, we've decided it's time to have us all on VS2022.
- **Lava DotLiquid Engine is No Longer Used** -
	As mentioned [in this blog post](https://community.rockrms.com/connect/ending-support-for-dotliquid-lava-engine), DotLiquid support has ended. When Rock starts up, Fluid will automatically be selected as the Lava engine. If any of your plugins still reference any old DotLiquid code, ensure it is removed. The `DotLiquid.dll` will be removed from Rock in v18. If you have questions about converting from DotLiquid to Fluid, please see the [Upgrading Custom Lava Components for v13](https://community.rockrms.com/page/2305) article.
- **New Logging Engine** -
	Rock now uses a new logging system that makes use of the Microsoft.Extensions.Logging library. Legacy methods are still available for now and will be removed in a future version of Rock. If you use the logging system in your plugins there will be a new UI to enable logging, which will require some custom JSON to be configured to enable the legacy logging domains. See the [Developer 303](https://sparkdevnetwork.gitbook.io/developer-303-blast-off/rock-logging-engine) guide for details on how to configure logging to display messages from your plugins.
- **Development / Build Issues** -
	If you run into odd 'build' issues, you may need to run an `npm ci` on your Rock.JavaScript.Obsidian and Rock.JavaScript.Obsidian.Blocks projects.
	If you are using AppVeyor and are having node build issues. Be aware that AppVeyor has recently updated their default node version so you may need to add an environment variable that specifies a version of node to run on. For example: Key: `nodejs_version` Values: `22.6.0`
- **New Required Properties on Page, Registration and AttributeMatrixItem** -
	In this version of Rock we are performing a small denormalization on these three tables to improve performance of Attribute Values in Rock. They will receive the following new properties that are required and do not have default values:
	- Page - SiteId
		- Registration - RegistrationTemplateId
		- AttributeMatrixItem - AttributeMatrixTemplateId
	If you do any direct inserts to these three tables you will have to put conditional logic in your queries if your code needs to support Rock versions before v17 and v17 and later concurrently. You can see an example of this [here](https://github.com/SparkDevNetwork/Rock/commit/47c15efaadaf0fba4608215f13ed82e7f5246bf7).

### 17.0.35 January 8, 2025

- The constructor of the `StructuredContentHelper` class has been updated to accept an optional `userValues` parameter of type `Dictionary` alongside the existing `content` parameter. This breaking change will be reverted in 17.0.37.

### 17.0.34 December 19, 2024

- When loading attributes on the `Rock.Model.ConnectionRequest` or `Rock.Model.RegistrationRegistrant` entities, and *the entity has not yet been saved to the database*, it is necessary to manually set the `ConnectionTypeId` and `RegistrationTemplateId` properties before calling the `LoadAttributes()` method.

### 17.0.33 December 6, 2024

- The visibility of the `ScheduleCoordinatorNotificationTypes` property in `Rock.Web.Cache.GroupTypeCache` has been modified from `public` to `private`.

### 17.0.32 November 15, 2024

- The properties `ParameterKey` and `ParameterCount` in the Lava Block `Rock.Lava.Blocks.AdaptiveMessageBlock` have been updated to `ParameterMessageKey` and `ParameterAdaptationPerMessage`.

### 17.0.21 June 6, 2024

- The NCOA block and job have been replaced with a new block found under Tools \> Data Integrity.
	The PostV12.4 Update Helper Job has been removed as the earliest available version doesn't require this to run.
	The `Rock.Web.HttpModules.Observability` has moved to `Rock.Web.HttpModules.RockGateway`. Any code that was referencing the old class should reference the new class name.
	The Rock.StatementGenerator has been removed and should no longer be used.
	The `Rock.ViewModels.Reporting.FieldFilterRuleBag` and `Rock.ViewModels.Reporting.FieldFilterGroupBag` have been modified to use an `enum` instead of an `int` as their data type.
	Removed classes and methods that were marked as Obsolete in v12 and older: [See full list here.](https://community.rockrms.com/page/3164)

### 17.0.20 May 23, 2024

- The values for the enum type `AgeBracket` in the `Rock.Enums.dll` have been modified so that values reflect the age in numeric order. Any specific references to an enum value that don't come from the database will need to be updated.

### 17.0.18 April 25, 2024

- The enum type `MobilePageType` in `Rock.Mobile.AdditionalPageSettings` has moved to the namespace `Rock.Enums.Cms`. Any code referencing the old enum type needs to be changed.

### 17.0.16 March 28, 2024

- The `GetBlockInitializationAsync()` method of the `Rock.Blocks.IRockBlockType` interface has been updated to work asynchronously. Any code that implements this interface should be updated to run asynchronously.
	The static `BuildMobilePackage` method was marked obsolete in v12 and removed from the `Rock.Mobile.MobileHelper` class in v17.0. the static `BuildMobilePackageAsync` method may be as an alternative.
	The override of the `Dictionary<string, string> GetPrivateConfigurationValues( Dictionary<string, string> publicConfigurationValues) ` method was removed from the `Rock.Field.Types.SecurityRoleFieldType` class.

### 17.0.14 March 7, 2024

- The AdditionalSettingsExtensions class was moved from the `Rock.Utility.ExtensionMethods` namespace to `Rock`. Any third-party code using the class will need to be recompiled to use the updated namespace.

### 17.0.12 February 1, 2024

- The method `public static object FilterNotFollowed( Context context, object dataObject )` in `Rock.Lava.RockLiquid.RockFilters.cs` has been renamed to `public static object FilterUnfollowed( Context context, object dataObject )`. Similarly, the method `public static object FilterNotFollowed( ILavaRenderContext context, object dataObject )` in `Rock.Lava.Filters.LavaFilters.cs` has been renamed to `public static object FilterUnfollowed( ILavaRenderContext context, object dataObject )`. Any code referencing these two method would need to be recompiled.

### 17.0.9 December 14, 2023

- The enum type `ZeroToTwelve` in the enum `Rock.Enums.Crm.AgeBracket` has been replaced by two other enum types namely `ZeroToFive` and `SixToTwelve`. The code referencing the old enum type needs to be changed.

### 17.0.8 November 30, 2023

- In the class `Rock.Rest/v2/ControlsController.cs `, the method `public IHttpActionResult DefinedValuePickerGetAttributes( DefinedValuePickerGetAttributesOptionsBag options )` has been renamed to `public IHttpActionResult DefinedValueEditorGetAttributes( DefinedValueEditorGetAttributesOptionsBag options )`. Similarly, the method `public IHttpActionResult DefinedValuePickerSaveNewValue( DefinedValuePickerSaveNewValueOptionsBag options )` in the same class has been renamed to `public IHttpActionResult DefinedValueEditorSaveNewValue( DefinedValueEditorSaveNewValueOptionsBag options )`. Any code referencing these two method would need to be recompiled.

### 17.0.4 October 5, 2023

- The property `GetLegacyGlobalMergeFields` in the class `Rock.Lava.CommonMergeFieldsOptions` which was marked obsolete in v16 has been removed.
	The enum class `LavaSupportLevel` in `Rock.Lava` which was marked obsolete in v16 has been removed.
	Similarly, the property `LavaSupportLevel` in the class `Rock.Web.Cache.GlobalAttributesCache` has been removed
	The method `public static bool CheckSqlServerVersion(int majorVersionNumber)` in the class `Rock.Update.Helpers.VersionValidationHelper` has been removed. The code referencing that method needs to be rewritten to use the new method `public static bool CheckSqlServerCompatibilityLevel(int compatibiltyLevel)`

### 17.0.3 September 21, 2023

- The `public virtual List GetBreadCrumbs( PageReference )` method in the `Rock.Web.UI.RockBlock` class is no longer called before a block is initialized. Therefore if you were using the method to initialize block data it will no longer work as expected.
	The type of the property `PersonEntrySmsOptInEntryOption` in the class `Rock.Model.WorkflowActionForm` has been changed from `Rock.Model.WorkflowActionFormPersonEntryOption` to `Rock.Model.WorkflowActionFormShowHideOption`. The code making use of this property will need to be adjusted to the new type and recompiled.
	A similar change has been made with the `PersonEntrySmsOptInEntryOption` property in the class `Rock.Web.Cache.WorkflowActionFormCache`. The property was of type `Rock.Model.WorkflowActionFormPersonEntryOption` but now it has been changed to `Rock.Model.WorkflowActionFormShowHideOption`. The code making use of this property will need to be adjusted to the new type and recompiled.
	The type of the property `SmsOptIn` has been changed from to `Rock.Model.WorkflowActionFormShowHideOption`. The code making use of this property will need to be adjusted to the new type and recompiled.

### 17.0.2 September 7, 2023

- `CheckedSecurityActions` property in `Rock.Web.Cache.BlockTypeCache` which was marked obsolete in v11.0 has been removed. Similarly, the methods `public void SetSecurityActions(RockBlock blockControl)` and `public void SetSecurityActions(Type blockType)` in the same class have also been removed as they too were marked obsolete in v11.0.
	The method `public method Rock.Model.ExceptionLogService.TruncateLog` has been made `static`. The code using this method would need to be recompiled.
	The `ValueAsPerson` property has been removed from `Rock.Model.AttributeValue.cs`. The code using the property needs to be changed to use the `ValueAsPersonId` property instead.

### 17.0.1 August 24, 2023

- Rock has stopped supporting legacy Lava. With that the following classes have been removed
	- `public class Rock.Lava.EntityAttribute`
		- `public class Rock.Lava.LegacyLavaSyntaxDetectedException`
		- `public class Rock.Lava.LegacyLavaUpdater`

## Rock 16.9 Released February 24, 2025

---

Developers, starting with v16.9...
- The dependencies `Microsoft.AspNetCore.WebUtilities` and `SharpZipLib` have been removed from Rock.

## Rock 16.7 Released January 2, 2025

---

Developers, starting with v16.7...
- The `ScheduleCancellationPersonAliasId` property found in `Rock.Web.Cache.GroupCache` is now obsolete. Please use `ScheduleCoordinatorPersonAliasId` instead.
- The `ScheduleCancellationPersonAlias` property found in `Rock.Model.Group` is now obsolete. Please use `ScheduleCoordinatorPersonAlias` instead.
- The constructor of the `StructuredContentHelper` class has been updated to accept an optional `userValues` parameter of type `Dictionary` alongside the existing `content` parameter. This breaking change will be reverted in v16.10.

## Rock 16.6 Released August 20, 2024

---

In v16.6 we've changed the Service class in order to support an advanced Entity Framework pattern that we're going to try using in v17. Depending on how you access the service layer for any custom models you've created, you may need to change that code when you recompile after v16.6:
- We changed the `Service` class type declaration to be a `class`, inheriting from `IEntity` rather than only the generic `Entity<T>`.  
	[![v16_6_EFChange.png](https://community.rockrms.com/Content/Developer/TechnicalReleaseNotes/v16_6/v16_6_EFChange.png)](https://community.rockrms.com/Content/Developer/TechnicalReleaseNotes/v16_6/v16_6_EFChange.png "click to expand")
- If you have extended the generic `Service` class you'll want to ensure you've updated the class type declaration to match the new definition and referenced `Rock.Lava.Shared` and `DotLiquid` (which are referenced by `IEntity`). [![v16_6_EFChangeExampleUsageUpdated.png](https://community.rockrms.com/Content/Developer/TechnicalReleaseNotes/v16_6/v16_6_EFChangeExampleUsageUpdated.png)](https://community.rockrms.com/Content/Developer/TechnicalReleaseNotes/v16_6/v16_6_EFChangeExampleUsageUpdated.png "click to expand")

## Rock 16.0 Released October 3, 2023

---

Developers, starting with v16.0...
- **User / Person Preferences** -
	If you have been using RockBlock GetUserPreference(...), GetUserPreferences(...), or SetUserPreference(...) (as mentioned in the [101 Launchpad guide](https://community.rockrms.com/documentation/BookContent/16#classmethods)) you should convert over to the new [Person Preferences](https://community.rockrms.com/documentation/BookContent/16#personpreferences) system. These were formerly stored as AttributeValue but are now in the new PersonPreference table. You should migrate any stored values when you update your code (if they were not migrated during the v16.0 update).

### 1.16.0.9 August 10, 2023

- The property `UsagesRemaining` has been renamed to `RegistrationUsagesRemaining` in the class `Rock.Model.RegistrationTemplateDiscountWithUsage`. The code referencing this property must be modified to use the new name.
	The method `public static string GetValue( string key, string defaultValue )` in the `Rock.Web.SystemSettings` class, which was originally added in v15.0, has been removed in v15.2. Nothing other than core should have been using that method, but any code using the old method needs to be changed to use the `public static string GetValue( string key )` method.

### 1.16.0.7 June 29, 2023

- The class `RockMobileBlockType` has been marked obsolete in v16.0. The code using the class need to be changed to use the `RockBlockType`

### 1.16.0.6 June 15, 2023

- The method `public IEntity GetEntity(Guid entityTypeGuid, Guid entityGuid)` has been removed from the class `Rock.Model.EntityTypeService`. The code using this method must be re-written to use the `public IEntity GetEntity( int entityTypeId, int entityId )` method in the same class.
	The setters of the following properties in the `Rock.Model.Person` has been set to private:
	- Age
		- AgeBracket
	The code using these setters needs to be changes to update the `BirthDay`, `BirthMonth` and `BirthYear`.

### 1.16.0.5 June 1, 2023

- The REST APIs
	- api/Badges/FamilyAttendance/{personId}/{monthCount}
		- api/PersonBadges/FamilyAttendance/{personId}/{monthCount}
	have been modified to include an optional parameter `showAsIndividual`  
	The updated endpoints are
	- api/Badges/FamilyAttendance/{personId}/{monthCount}/{showAsIndividual?}
		- api/PersonBadges/FamilyAttendance/{personId}/{monthCount}/{showAsIndividual?}
	respectively

### 1.16.0.3 May 4, 2023

- The `Group Location Historical Schedule` entity has been deprecated. Use the `History` entity instead. The code that uses the former entity need to be changed.

### 1.16.0.2 April 21, 2023

- The `Message` parameter has been removed from the `LavaRenderException` and the `LavaParseException`. The code that uses those methods need to be rewritten to use either the `GetUserMessage` or the `GetDiagnosticMessage` method.

### 1.16.0.1 April 6, 2023

- The following Enums have been moved to the Rock.Enum namespace. Code using these will need to be recompiled.
	- `ScheduledAttendanceItemMatchesPreference`
		- `ScheduledAttendanceItemStatus`
		- `SchedulerResourceGroupMemberFilterType`
	The following Enums have been moved from `Rock.Enums.Blocks.Groups` to `Rock.Enums.Blocks.Group`. Code using these will need to be updated and recompiled.
	- `GroupAttendanceDetailDateSelectionMode`
		- `GroupAttendanceDetailLocationSelectionMode`
		- `GroupAttendanceDetailScheduleSelectionMode`

## Rock 15.0 Released May 15, 2023

---

- As mentioned [here](https://community.rockrms.com/connect/ending-support-for-legacy-financial-gateways), Rock is ending support for legacy financial gateways. If you have developed a custom gateway, make sure it implements the [`IHostedGatewayComponent`](https://github.com/SparkDevNetwork/Rock/blob/develop/Rock/Financial/IHostedGatewayComponent.cs) interface. See the [NMI Gateway](https://github.com/SparkDevNetwork/Rock/blob/develop/Rock.NMI/Gateway.cs) for an implementation example.
- We have replaced all legacy TransactionEntry block instances on all pages with the newer UtilityPaymentEntry block (NMI/MyWell compatible) and have attempted to preserve any custom block settings you might have configured. If you are still trying to use one of the legacy payment gateways, you will need to manually change back to the legacy TransactionEntry block, otherwise you will see an error when the block loads "Unsupported Gateway This block only supports Gateways that have a hosted payment interface." Also, the new block only supports one payment gateway per instance/configuration.
	Please Note: The internal "Registration Detail" where it used to be possible to accept/enter a payment on behalf of the registrant no longer supports the legacy payment gateways. So, you would need to direct people to make payment on their own behalf using the /MyAccount page's "Registration List Lava" block.

### 1.15.0.15 March 23, 2023

- The property `Rock.Bulk.SampleData.SampleDataManager.CreatorPersonAliasId` has been changed from int to int?. Code making use of this property will need to be adjusted for the nullable type and recompiled.

### 1.15.0.14 March 9, 2023

- The enum `Rock.Common.Mobile.Enums.CommunicationType.SMS` has been renamed to `Rock.Common.Mobile.Enums.CommunicationType.Sms`. Code making use of this enum will need to be updated and recompiled.
	The following static method had is signature changed by adding a new parameter with no default value `Rock.Mobile.MobileHelper.GetEmailEditFieldXaml`. Code using this method will need to be recompiled.
	- From: ListGetEmailEditFieldXaml(string name, string label, string value, bool isRequired, bool multiline = False, int maxLength = 0)
		- To: ListGetEmailEditFieldXaml(string name, string label, string value, bool isEnabled, bool isRequired, bool multiline = False)
	The following static method had is signature changed by adding a new parameter with no default value `Rock.Mobile.MobileHelper.GetTextEditFieldXaml`. Code using this method will need to be recompiled.
	- From: ListGetTextEditFieldXaml(string name, string label, string value, bool isRequired, bool multiline = False, int maxLength = 0)
		- To: ListGetTextEditFieldXaml(string name, string label, string value, bool isEnabled, bool isRequired, bool multiline = False)

### 1.15.0.13 February 24, 2023

- The method `Rock.Web.Cache.PersonalizationSegmentCache.GetActiveSegments` had its signature changed to remove the boolean includeSegmentsWithNonPersistedDataViews since segments no longer require persisted datasets. Code making use of this method will need to be updated and recompiled.
	We have replaced all legacy `TransactionEntry` block instances on all pages with the newer `UtilityPaymentEntry` block (NMI/MyWell compatible) and have attempted to preserve any custom block settings you might have configured. If you are still trying to use one of the legacy payment gateways, you will need to manually change back to the legacy TransactionEntry block, otherwise you will see an error when the block loads "Unsupported Gateway This block only supports Gateways that have a hosted payment interface." Also, the new block only supports one payment gateway per instance/configuration.

### 1.15.0.12 February 10, 2023

- The following methods were marked obsolete in v10 and removed from the `Rock.Model.CommunicationResponseService` class in v15.0:
	- GetCommunicationsAndResponseRecipients
		- GetConversation
		- GetResponseRecipients
		- UpdatePersonAliasByMessageKey
		- UpdateReadPropertyByMessageKey
	The enum `Rock.Model.PersonAliasType` was marked obsolete in v10 and removed in v15.0:

### 1.15.0.11 January 26, 2023

- The Enum `CommunicationMessageFilter` has been moved to the Rock.Enum namespace. Code use this will need to be recompiled.

### 1.15.0.9 December 14, 2022

- REST call api/v2/Controls/LocationPickerGetActiveChildren has been changed to api/v2/Controls/LocationItemPickerGetActiveChildren.
	The following properties in the POCO class `Rock.IpAddress.Location` have been made nullable to improve efficiency in situations where the IpRegistry lookup service is not available.
	- `public double? Longitude`
		- `public double? Latitude`

### 1.15.0.8 December 1, 2022

- The following properties related to RSVP Reminders have been removed since they will not be used in the Group Reminders feature:
	- `Rock.Model.Group.RSVPReminderAdditionalDetails`
		- `Rock.Model.GroupLocationScheduleConfig.RSVPReminderAdditionalDetails`
		- `Rock.Model.GroupMemberAssignment.LastRSVPReminderSentDateTime`
		- `Rock.ViewModels.Entities.GroupBag.RSVPReminderAdditionalDetails`
		- `Rock.ViewModels.Entities.GroupMemberAssignmentBag.LastRSVPReminderSentDateTime`
	The class public property Rock.Transactions.IndexEntityTransaction was marked obsolete in 13.7 but has been moved back into the active code base with some changes. This was done to efficently process search indexing.

### 1.15.0.5 October 19, 2022

- Removed classes and methods that were marked as Obsolete in v9.1:
	- `public method Rock.ExtensionMethods.AddPageRoute`
		- `public method Rock.ExtensionMethods.BindToDefinedType`
		- `public method Rock.ExtensionMethods.ToCacheAttributeList`
		- `public class Rock.Financial.ThreeStepGatewayComponent`
		- `public method Rock.Model.FeeInfo..ctor`
		- `public property Rock.Model.FeeInfo.Option`
		- `public method Rock.Model.GroupService.AllowsDuplicateMembers`
		- `public method Rock.Model.GroupService.GetAllDescendents`
		- `public method Rock.Model.RegistrationTemplateFeeService.GetParsedFeeOptionsWithCostAsNumber`
		- `public method Rock.Model.RegistrationTemplateFeeService.GetParsedFeeOptionsWithNameAndValueString`
		- `public method Rock.Model.RegistrationTemplateFeeService.GetParsedFeeOptionsWithoutCost`
		- `public method Rock.Model.RegistrationTemplateFeeService.MigrateFeeCostValueToFeeItems`
		- `public method Rock.Model.Schedule.GetCalenderEvent`
		- `public method Rock.Model.ScheduleICalHelper.GetCalenderEvent`
		- `public field Rock.SystemGuid.FieldType.AUDIO`
		- `public field Rock.SystemGuid.FieldType.VIDEO`
		- `public field Rock.SystemGuid.Page.SMS_FROM_VALUES`
		- `public class Rock.SystemGuid.SystemSetting`
		- `public field Rock.SystemKey.SystemSetting.DO_NOT_DISTURB_ACTIVE`
		- `public field Rock.SystemKey.SystemSetting.DO_NOT_DISTURB_END`
		- `public field Rock.SystemKey.SystemSetting.DO_NOT_DISTURB_START`
		- `public property Rock.Web.Cache.InteractionChannelCache.InteractionComponents`
		- `public property Rock.Web.UI.Controls.NumberUpDownGroup.ControlGroup`
		- `public property Rock.Web.UI.Controls.PageBreadCrumbs.PreText`
		- `public class Rock.Web.UI.Controls.PersonMergeField`
		- `public class Rock.Web.UI.Controls.PersonMergeFieldHeaderTemplate`
		- `public interface Rock.Rest.IHasCustomRoutes`
		- `public method Rock.Rest.Controllers.ContentChannelItemSlugsController.GetUniqueContentSlug`
	In preperation to upgrade the version of Quartz use by RockJobs the architecture of the Rock Jobs has changed. Current compiled code will not be affected, however if compiling you will get a warning. The old Rock Job architecture will work through v15, but should be updated before v16.
	The read-only property QuartzScheduler was removed from the static class `Rock.WebStartup.RockApplicationStartupHelper`. The QuartzScheduler property is now on `Rock.Model.ServiceJobService`.
	The constructor for `Rock.Lava.DotLiquid.DotLiquidTemplateProxy` now requires a description along with the template.

### 1.15.0.3 September 20, 2022

- The enum `Rock.Model.CommunicationStatus` has been moved from Rock.dll to Rock.Enums.dll. Code using this enum will need to be recompiled.
	The following static method had is signature changed by adding a parameter with a default value `Rock.Lava.Filters.TemplateFilters.Split`. Code using this method will need to be recompiled.
	- From: List Split(string input, string pattern, object removeEmpty)
		- To: List Split(string input, string pattern, object removeEmpty, object count)

## Rock 14.0 Released October 12, 2022

---

Starting with v14.0...
- **Core** -
	The following models will be slightly de-normalized to gain some enhanced performance with some grids. *(Those performance enhancements will come in future versions.)* Although Rock's PreSave() hooks will ensure the value is set when *adding* a new item, if you have code that attempts to modify the related property on an existing item, you will need to adjust your code to also take this into account. Also, any code that bypasses the Pre/PostSave operations (`SaveChanges( disablePrePostProcessing: true )` or using `BulkInsert()`) will need to be updated accordingly.
	- `ConnectionRequest.ConnectionTypeId`
		- `GroupMember.GroupTypeId`
		- `RegistrationRegistrant.RegistrationTemplateId`
	The parent class of the badge component `Rock.Badge.Component.Campus` has been changed. Previously it inherited from `Rock.Badge.HighlightLabelBadge`. This has been changed to `Rock.Badge.BadgeComponent`. This is to remove Web Forms dependency from the core Rock back end code. Plugins using the Campus badge component will need to use the `Render()` method instead of the `GetLabel()` method.
	~~The following libraries were updated for compatibility reasons:
	- RestSharp upgraded from 105.2.3 to 106.12.0
	- RestSharp.Newtonsoft.Json from 1.0.0 to 1.5.1
	If you have a plugin that is using any of these, it will need to be recompiled to use this new version.
	~~
	~~The reference between a PersonAlias to a Person has been severed so the `PersonAlias.PersonId` property is now a *nullable* int (`int?`)~~
	Updated Entity Framework to version 6.4.4.
	When referencing any DLL directly, you may need to switch the NuGet reference specifically targeting 6.4.4 so that the props file is updated correctly.
	The `Render()` method of the `Rock.Badge.BadgeComponent` classes has been updated to include IEntity and use `TextWriter` instead of `HtmlTextWriter`. This was done to prevent a possible race condition with the Entity and for MS .Net Core compatiblity. The old method still exists in the parent class but is blank so it doesn't do anything. Custom code using Rock's BadgeComponent classes will need to use the new method.
	The method `Rock.Lava.RockFilters.Trim(object)` has moved from the Rock.dll to Rock.Lava.dll. Additionally an optional parameter `string textToRemove` was added. Code using this method will need to insure the Rock.Lava.dll is referenced in the project and then be recompiled.
	Methods that returned type `Ical.Net.Event` have been changed to return the type Ical.Net.CalendarComponents.CalendarEvent to accomadate an upgrade to Ical. Some of these methods are obsolete as of v12.4 and should be updated regardless.
	The `Rock.Badge.HighlightLabelBadge` is [being obsoleted](https://github.com/SparkDevNetwork/Rock/commit/0f9be8d88dc43553595fdac410f083c848868af7) in favor of `Rock.Badge.BadgeComponent`. This is to remove Web Forms dependency from the core Rock back end code.
	The SMTP email delivery for Mandrill and Mailgun has been removed. Mailgun is still available using their HTTP service. The SMTP is still available in Rock but should only be used for development and testing.
	Corrected the SystemGuid constants listed below. Code using these will need to be recompiled.
	- `Rock.SystemGuid.EntityType.BENEVOLENCE_TYPE`
		- `Rock.SystemGuid.EntityType.CONNECTION_OPPORTUNITY_CONNECTOR_GROUP`
		- `Rock.SystemGuid.EntityType.MEDIA_ACCOUNT`
- Updated workflow attributes to automatically encrypt and decrypt values for the following: Benevolence Request Set Attribute, Group Attribute Set, Group Member Attribute Set, Entity Attribute Set, Lava Run, and SQL Run. Any attribute that uses the EncryptedTextFieldType will also be automatically encrypted and decrypted.
- **Development** -
	Added `.gitignore` file to `RockWeb\Plugins` folder. If you are building plugins from a forked copy of the repository you may need to delete that file in your forked repository.
	Removed classes and system GUIDs related to post migration jobs that are no longer needed. These should not be used by any third-party code and should not require any action.

### 1.14.0.16 August 9, 2022

- The following changes have been made to Rock.Chart:
	- Renamed class `Rock.Chart.ChartJsCategoryValuesDataPoint` to `Rock.Chart.ChartJsCategorySeriesDataPoint`
		- Renamed class `Rock.Chart.ChartJsCategoryValuesDataset` to `Rock.Chart.ChartJsCategorySeriesDataset`
		- Renamed interface `Rock.Chart.IChartJsCategoryValuesDataPoint` to `IChartJsCategorySeriesDataPoint`
		- Removed property `Rock.Chart.ChartJsTimeSeriesDataFactory.GetJsonArgs.UnitType`
	The class `Rock.Communication.Transport.MailgunSmtp` has been removed. All Mailgun accounts need to use HTTP instead of SMTP.
	Enum `Rock.Web.UI.Controls.AccountTreeViewItem.GetCountsType` removed vaue `GroupMembers = 2`

### 1.14.0.14 July 12, 2022

- The parent class of the badge component `Rock.Badge.Component.Campus` has been changed. Previously it inherited from `Rock.Badge.HighlightLabelBadge`. This has been changed to `Rock.Badge.BadgeComponent`. This is to remove Web Forms dependency from the core Rock back end code. Plugins using the Campus badge component will need to use the `Render()` method instead of the `GetLabel()` method.

### 1.14.0.13 June 15, 2022

- Removed classes and system GUIDs related to post migration jobs that are no longer needed. These should not be used by any third-party code and should not require any action.
	- Job Classes (`Rock.Jobs`):
		- `MigrateAttendanceOccurrenceData`
				- `MigrateFamilyAlternateId`
				- `PostV100DataMigrationsSundayDate`
				- `PostV100DataMigrationsValueAsNumeric`
				- `PostV103DataMigrationsSpiritualGifts`
				- `PostV110DataMigrationsPopulateRelatedDataViewId`
				- `PostV110DataMigrationsResponseCodeIndex`
				- `PostV110DataMigrationsUpdateDateKeyValues`
				- `PostV74DataMigrations`
				- `PostV80DataMigrations`
				- `PostV84DataMigrations`
				- `PostV90DataMigrations`
				- `PostV90DataMigrationsForDISC`
				- `PostV90DataMigrationsScheduledTransactionNotesToHistory`
		- System GUIDs (`Rock.SystemGuid.ServiceJob`):
		- `DATA_MIGRATIONS_100_ATTRIBUTEVALUE_VALUEASNUMERIC`
				- `DATA_MIGRATIONS_100_SUNDAYDATE`
				- `DATA_MIGRATIONS_103_SPIRITUAL_GIFTS`
				- `DATA_MIGRATIONS_110_COMMUNICATIONRECIPIENT_RESPONSECODE_INDEX`
				- `DATA_MIGRATIONS_110_POPULATE_DATE_KEYS`
				- `DATA_MIGRATIONS_110_POPULATE_RELATED_DATAVIEW_ID`
				- `DATA_MIGRATIONS_74`
				- `DATA_MIGRATIONS_80`
				- `DATA_MIGRATIONS_84`
				- `DATA_MIGRATIONS_90`
				- `DATA_MIGRATIONS_90_DISC`
				- `DATA_MIGRATIONS_90_SCHEDULEDTRANSACTIONNOTESTOHISTORY`
				- `MIGRATE_ATTENDANCE_OCCURRENCE`
				- `MIGRATE_COMMUNICATION_MEDIUM_DATA`
				- `MIGRATE_FAMILY_CHECKIN_IDS`
				- `MIGRATE_HISTORY_SUMMARY_DATA`
				- `MIGRATE_INTERACTIONS_DATA`

### 1.14.0.12 May 31, 2022

- The `Render()` method of the following `Rock.Badge.BadgeComponent` classes has been updated to include IEntity and use `TextWriter` instead of `HtmlTextWriter`. This was done to prevent a possible race condition with the Entity and for .net core compatiblity. The old method still exists in the parent class but is blank so it doesn't do anything. Custom code using Rock's BadgeComponent classes will need to use the new method.
	- `Rock.Badge.Component.HighlightLabelBadge`
		- `Rock.Badge.Component.IconBadge`
		- `Rock.Badge.Component.Achievement`
		- `Rock.Badge.Component.AlertNote`
		- `Rock.Badge.Component.Assessment`
		- `Rock.Badge.Component.AttendingDuration`
		- `Rock.Badge.Component.DISC`
		- `Rock.Badge.Component.FamilyAttendance`
		- `Rock.Badge.Component.FamilyWeeksAttendedInDuration`
		- `Rock.Badge.Component.GeofencedByGroup`
		- `Rock.Badge.Component.Giving`
		- `Rock.Badge.Component.GroupTypeAttendance`
		- `Rock.Badge.Component.InDataView`
		- `Rock.Badge.Component.InGroupOfType`
		- `Rock.Badge.Component.InGroupWithPurpose`
		- `Rock.Badge.Component.InteractionsInRange`
		- `Rock.Badge.Component.LastVisitOnSite`
		- `Rock.Badge.Component.Liquid`
		- `Rock.Badge.Component.PersonalDevice`
		- `Rock.Badge.Component.Steps`
		- `Rock.Badge.Component.StreakEngagement`
		- `Rock.Badge.Component.TopPersonSignal`
	The method `Rock.Lava.RockFilters.Trim(object)` has moved from the Rock.dll to Rock.Lava.dll. Additionally an optional parameter `string textToRemove` was added. Code using this method will need to insure the Rock.Lava.dll is referenced in the project and then be recompiled.
	The following methods have been changed to return the type Ical.Net.CalendarComponents.CalendarEvent instead of Ical.Net.Event. Some are obsolete as of v12.4 and should be updated regardless.
	- Rock.Model.InetCalendarHelper.CreateCalendarEvent
		- Rock.Model.InetCalendarHelper.GetCalendarEvent
		- Rock.Model.InetCalendarHelper.GetOccurrences (all overrides)
		- Rock.Model.Schedule.GetICalEvent

### 1.14.0.11 May 17, 2022

- The following 'Location Services' have been removed in Rock v14. SmartyStreets and Bing should be used instead.
	- MelissaData
		Class `Rock.Address.MelissaData` and interface `Rock.MelissaData.AddressCheck` have been removed.
		- ServiceObjects
		Classes `Rock.Address.ServiceObjects` and `Rock.ServiceObjects.GeoCoder` have been removed.

### 1.14.0.10 April 26, 2022

- `Rock.Model.EntityTypeService.Get(string name, bool createIfNotFound)` has been renamed to `Rock.Model.EntityTypeService.GetByName(string name, bool createIfNotFound)`

### 1.14.0.9 April 12, 2022

- The namespace `Rock.ViewModel` has been renamed to `Rock.ViewModels`. Any code referencing this namespace will need to be recompiled.
	The signature for method `Rock.Lava.RockFilters.AppendFollowing` changed by adding a parameter with a default value. Code that uses this method will need to be recompiled.
	- From: `public static object AppendFollowing(Context context, object dataObject)`
		- To: `public static object AppendFollowing(Context context, object dataObject, string purposeKey)`
	The signature for method Rock.Lava.RockFilters.Format changed by renaming an existing parameter and adding an additional one. Code that uses this method will need to be recompiled.
	- From: `public static bool IsFollowed(Context context, object input, object personObject)`
		- To: `public static bool IsFollowed(Context context, object input, object parameter1, object parameter2)`
	The constructor for `Rock.Model.CampusTopicService` now uses the type `RockContext` instead of `DbContext`. This matches the implementation of other Rock classes.
	The enum `Rock.Model.Gender` has moved from the Rock project to the Rock.Enums project, the namespace remains the same. Code using this enum will need to reference the new dll and be recompiled.
	The method public method Rock.Model.SignatureDocument.CalculateSignatureVerificationHash has been removed from the SignatureDocument model. It is now a static method in SignatureDocumentService.
	- From: `public string CalculateSignatureVerificationHash()`
		- To: `public static string CalculateSignatureVerificationHash( SignatureDocument document )`
	The constant `Rock.SystemGuid.ConnectionActivityType.FUTURE_FOLLOWUP_COMPLETE` has been renamed to `Rock.SystemGuid.ConnectionActivityType.FOLLOWUP_DATE_REACHED` to better reflect its meaning. Code that references this field will need to be recompiled.

### 1.14.0.8 March 29, 2022

- The type of property `Rock.Blocks.Types.Mobile.Connection.ConnectionRequestDetail.RequestViewModel.Attributes` has been changed from `List` to `List`.

### 1.14.0.6 March 1, 2022

- public method `Rock.Rest.Jwt.JwtHelper.GetPerson` was renamed to `Rock.Rest.Jwt.JwtHelper.GetPersonFromJWTPersonSearchKey`. This method should only be used by Rock REST calls and so should not effect any third-party code.
	The following objects were moved from the "Rock" namespace to "Rock.Utility"
	- `CampaignItem`
		- `CreateConnectionRequestOptions`
		- `FamilyLimits`
	The public methods below use the class CampaignItem as a parameter. Any third-party code using the class will need to be recompiled to use the updated namespace.
	- `Rock.Utility.CampaignConnectionHelper.GetPendingConnectionCount`
		- `Rock.Utility.CampaignConnectionHelper.GetEntitySet`
		- `Rock.Utility.CampaignConnectionHelper.GetConnectorCampusIds`
		- `Rock.Utility.CampaignConnectionHelper.GetConnectionRequestsWithoutConnectorQuery`
		- `Rock.Utility.CampaignConnectionHelper.GetCampaignConfiguration`
		- `Rock.Utility.CampaignConnectionHelper.AddOrUpdateCampaignConfiguration`
		- `Rock.Utility.CampaignConnectionHelper.AddConnectionRequestsForPerson`

### 1.14.0.3 January 18, 2022

- The following properties where changed from public to private:
	- Rock.Model.ConnectionRequest.HistoryChangeList
		- Rock.Model.ConnectionRequest.PersonHistoryChangeList

## Rock 13.4 Released June 13, 2022

---

Starting with v13.4...
- **Core** -
	`.IsNull()` and `.IsNotNull()` extension methods have been obsoleted.

## Rock 13.1 Released February 22, 2022

---

Developers, starting with v13.1...
- **Core** -
	Updated web.config to allow C# 7.3 language feature in Rock Blocks.

## Rock 13.0 Released January 31, 2022

---

Developers, starting with v13.0...
- **Finance** -
	Usage of the older "CurrencySymbol" global attribute is now deprecated starting with v13 (see [v12.4 notes](#m12.4) below).
- **Development** -
	In order to load the experimental Rock.Javascript.Obsidian project in the Rock solution, you will need to add the "Node.js development" Workload to Visual Studio:
	![Visual Studio Add Workload](https://community.rockrms.com/Content/Developer/vs_nodejs_1.png)  
	![Visual Studio Node.js development](https://community.rockrms.com/Content/Developer/vs_nodejs_2.png)
- **Development** -
	All property and methods marked RockObsolete "1.8" and older will be removed from Rock. Those marked RockObsolete "1.9" will cause a compile error.
- **Development** -
	The interface `IRockMobileBlockType` now implements `IRockClientBlockType`. This will force the classes implemeting `IRockMobileBlockType` to implement the method `GetBlockInitialization( RockClientType clientType )`. This method should return an object containing the mobile block type's configuration.
- **Development** -
	Now that we have moved a number of extension methods (as well as RockDateTime) out of `Rock.dll` and *into* `Rock.Common.dll`, developers will need to include a project dependency/reference to `Rock.Common.dll` when you (re-)build plugins for Rock v13 or later.
- **Lava Engine** -
	In order to achieve a rather substantial performance improvement, we're making a significant changes to the underlying Lava parser. All existing custom Lava filters will break as a result of these changes. If you've created custom Lava filters, please read the [**Updating Custom Lava Component**](https://community.rockrms.com/page/2305) instructions on what you need to do to be compatible with Rock v13. Contact the core team to discuss questions you have.  
	**Also Note: we are no longer going to accept any custom Lava filter plugins in the RockShop**.
- **Redis** -
	Support for Redis clusters is deprecated as of Rock v13. Previous versions of Rock clusters relied on a Redis server. The message bus now replaces the need for the Redis server. We highly recommend moving away from the Redis solution to the new web farm features.
- **Development** -
	It will no longer be possible to start from an existing database that is *older than* version 11 using the `develop` branch. Why: The EF 'migration squish' we've performed assumes your underlying database is either empty, or has everything up to version 11.0 (`release-1.11.0`) in it.
	If you *do* have a v10.x database (for example) that you wish to move to the `develop` branch, you should switch to the `release-1.11.0` branch first (or `release-1.12.0`) in order to allow Entity Framework to migrate your database to that level.
- **ASP.NET 4.7.2** - We've upgraded the Rock solution to require asp.net 4.7.2.:
	- You can find our cheatsheet and notes about this conversion over at [v4.7.2 Cheatsheet](https://community.rockrms.com/developer/changelog/Rockv13ASPNET472)
		- If you are using AppVeyor, you can also find notes about what we did to get AppVeyor to continue to build on the [v4.7.2 Cheatsheet](https://community.rockrms.com/page/2152#AppVeyor)
- The following breaking changes have been introduced in pre-alpha 1.13.0.1:
	- Made the property `Rock.Model.CommunicationRecipient.PersonAliasId` nullable
		- Removed setter from property `Rock.Model.SchedulerResource.HasSchedulingConflict`. The property's value is now determined by checking the new property `Rock.Model.SchedulerResource.SchedulingConflicts` for any items. This new property is a `List<SchedulerResourceScheduled>` and holds any scheduling conflicts.
		- Removed method `Rock.Reporting.DataFilter.Workflow.WorkflowAttributesFilter.workflowTypePicker_SelectItem`. Selection functionality will be performed during the ValueChanged event using `Rock.Reporting.DataFilter.Workflow.WorkflowAttributesFilter.workflowTypePicker_ValueChanged` instead of the SelectItem event.
- The following breaking changes have been introduced in pre-alpha 1.13.0.9:
	- Moved the following classes to Namespace `Rock.Lava.RockLiquid.Blocks`.
		- `Rock.Lava.Blocks.Cache`
				- `Rock.Lava.Blocks.CalendarEvents`
				- `Rock.Lava.Blocks.EventScheduledInstance`
				- `Rock.Lava.Blocks.Execute`
				- `Rock.Lava.Blocks.InteractionContentChannelItemWrite`
				- `Rock.Lava.Blocks.Javascript`
				- `Rock.Lava.Blocks.JsonProperty`
				- `Rock.Lava.Blocks.RockEntity`
				- `Rock.Lava.Blocks.Search`
				- `Rock.Lava.Blocks.Sql`
				- `Rock.Lava.Blocks.Stylesheet`
				- `Rock.Lava.Blocks.TagList`
				- `Rock.Lava.Blocks.WebRequest`
				- `Rock.Lava.Blocks.WorkflowActivate`
		- Moved class `Rock.Utility.RockSerializableDictionary` to `Rock.Lava`.

### 1.13.0.28 November 30, 2021

- Moved the sealed class `Rock.Jobs.TransactionView` into the `Rock.Jobs.GivingAutomation` class.
	- Before `Rock.Jobs.TransactionView`
		- After `Rock.Jobs.GivingAutomation.TransactionView`
	Moved the sealed class `Rock.Jobs.AlertView` into the `Rock.Jobs.GivingAutomation` class.
	- Before `Rock.Jobs.AlertView`
		- After `Rock.Jobs.GivingAutomation.AlertView`
	Changed the type of property `Rock.Jobs.GivingAutomation.GivingAutomationContext.DataViewPersonQueries` to return the person object instead of just the Person ID
	- Before `public Dictionary> DataViewPersonQueries`
		- After `public Dictionary> DataViewPersonQueries`
	/Replaced the property `Rock.Common.Mobile.DeviceData.VersionString` with `Rock.Common.Mobile.DeviceData.ApplicationVersion`. This was to allow the inclusion of a new property `Rock.Common.Mobile.DeviceData.ShellVersion`.

### 1.13.0.27 November 16, 2021

- Added an additional parameter with a default value to method `Rock.Blocks.Types.Mobile.Groups.GroupAttendanceEntry.SaveAttendance`. Code making use of this method will need to be recompiled.
	- Before `public BlockActionResult SaveAttendance(Guid groupGuid, DateTimeOffset date, List attendees, bool didNotMeet)`
		- After `public BlockActionResult SaveAttendance(Guid groupGuid, DateTimeOffset date, List attendees, bool didNotMeet, string notes)`

### 1.13.0.25 October 19, 2021

- The class `public class Rock.Blocks.Types.Mobile.Groups.AddToGroup` has been renamed to `Rock.Blocks.Types.Mobile.Groups.GroupRegistration`
	.
	Added additional parameters with defaults to method `Rock.Blocks.Types.Mobile.Cms.WorkflowEntry.GetNextForm`. Code making use of this method will need to be recompiled.
	- Before `public WorkflowForm GetNextForm( Guid? workflowGuid = null, string formAction = null, List formFields = null, WorkflowFormPersonEntryValues personEntryValues = null )`
		- After `public WorkflowForm GetNextForm( Guid? workflowGuid = null, string formAction = null, List formFields = null, WorkflowFormPersonEntryValues personEntryValues = null, List supportedFeatures = null )`

### 1.13.0.24 October 5, 2021

- Added additional parameters with defaults to method `Rock.Blocks.Types.Mobile.Cms.Register.RegisterUser`. Code making use of this method will need to be recompiled.
	- Before: `public object RegisterUser(AccountData account)`
		- After: `public object RegisterUser(AccountData account, bool supportsLogin = False, Nullable<Guid> personalDeviceGuid)`
	Two of the method `Rock.Data.DbContext.SaveChanges` signatures have been made virtual for future functionality.
	- `public virtual int SaveChanges(bool disablePrePostProcessing)`
		- `public virtual SaveChangesResult SaveChanges(SaveChangesArgs args)`

### 1.13.0.23 September 21, 2021

- The service job class `Rock.Jobs.GivingAnalytics` has been replaced with `Rock.Jobs.GivingAutomation`. A migration will create the new job and remove any jobs using the old class. The following changes have been made to support this:
	- The system configuration constant `Rock.SystemKey.SystemSetting.GIVING_ANALYTICS_CONFIGURATION` for the GivingAnalytics job has been renamed to `Rock.SystemKey.SystemSetting.GIVING_AUTOMATION_CONFIGURATION`
		- The namespace `Rock.Utility.Settings.GivingAnalytics` as been renamed to `Rock.Utility.Settings.GivingAutomationSettings`. The following classes have also been moved/renamed:
	- `Rock.Utility.Settings.Alerting` to `Rock.Utility.Settings.Giving.GivingAlertingSettings`
			- `Rock.Utility.Settings.GiverBin` to ` Rock.Utility.Settings.Giving.GiverBin`
			- `Rock.Utility.Settings.GivingAnalytics` to ` Rock.Utility.Settings.Giving.GivingAutomationJobSettings`
			- `Rock.Utility.Settings.GivingAnalyticsSetting` to ` Rock.Utility.Settings.Giving.GivingAutomationSettings`
	The Enum `Rock.Model.PaymentRedirectVendor` has been removed.
	The property `Rock.Model.RegistrationInstance.PaymentRedirectData` has been removed.
	The method signature for `Rock.Model.RegistrationService.GetRegistrationContext` has been updated:
	- From `GetRegistrationContext(int registrationInstanceId, Person currentPerson, RegistrationEntryBlockArgs args, out String& errorMessage)`
		- To `GetRegistrationContext(int registrationInstanceId, Nullable registrationGuid, Person currentPerson, string discountCode, out String& errorMessage)`
	The property `Rock.Model.RegistrationTemplate.PaymentRedirectVendor` has been removed.
	In the service class `Rock.Model.FinancialTransactionService` the following methods have been renamed:
	- `Rock.Model.FinancialTransactionService.GetGivingAnalyticsMonthlyAccountGivingHistory` has been renamed to `GetGivingAutomationMonthlyAccountGivingHistory`
		- `Rock.Model.FinancialTransactionService.GetGivingAnalyticsMonthlyAccountGivingHistoryFromJson` has been renamed to `GetGivingAutomationMonthlyAccountGivingHistoryFromJson`
		- `Rock.Model.FinancialTransactionService.GetGivingAnalyticsSourceTransactionQuery` has been renamed to `GetGivingAutomationSourceTransactionQuery`
	The following Rock.Model classes had their `PreSaveChanges()` and/or `PostSaveChanges()` overrides moved to the SaveHook subclass:
	- `Attendance`

### 1.13.0.22 September 8, 2021

- Moved the Enum `ConnectionWorkflowTriggerType` from global to namespace Rock.Model.
	The value for `Rock.SystemGuid.DefinedValue.CREDITCARD_TYPE_JCB` has been corrected to take out a leading space.
	Changed the visibility of the class `Rock.Lava.LavaFilters` from Public to Internal.
	The following Rock.Model classes had their `PreSaveChanges()` and/or `PostSaveChanges()` overrides moved to the SaveHook subclass:
	- `ConnectionRequest`
		- `ConnectionRequestActivity`
		- `ConnectionWorkflow`
		- `ContentChannel`
		- `ContentChannelItem`
		- `EventCalendar`
		- `Note`
		- `NoteAttachment`
		- `RegistrationInstance`
		- `RegistrationTemplate`
		- `Step`
		- `Streak`
		- `Workflow`
		- `WorkflowType`

### 1.13.0.19 July 20, 2021

- The public method `Rock.Lava.LavaFilters.CreateShortLink` now requires a ILavaRenderContext object as a parameter. Old: `public static string CreateShortLink(object input, string token = "", int? siteId, bool overwrite = False, int randomLength = 10)` New: `public static string CreateShortLink(ILavaRenderContext context, object input, string token = "", int? siteId, bool overwrite = False, int randomLength = 10)`

### 1.13.0.17 July 6, 2021

- The field `public readonly DateTime Rock.Jobs.GivingAnalyticsContext.Now` was changed to a property with a public getter and setter.

### 1.13.0.16 June 22, 2021

- Added the interface `IRockClientBlockType` to `IRockMobileBlockType` which forces the implementation of the method `GetBlockInitialization()`.

### 1.13.0.13 May 11, 2021

- The following properties have been changed from DateTime to DateTimeOffset:
	- `Rock.Common.Mobile.MobileInteraction.DateTime`
		- `Rock.Common.Mobile.MobilePerson.BirthDate`
		- `Rock.Common.Mobile.Blocks.Groups.GroupAttendanceEntry.GroupData.Date`
		- `Rock.Common.Mobile.Blocks.RegisterAccount.AccountData.BirthDate`
	The property Rock.Common.Mobile.Blocks.Groups.GroupAttendanceEntry.GroupData.Dates changed from List<DateTime\> to List<DateTimeOffset\>
	The following method signatures have been updated to use DateTimeOffset instead of DateTime:
	- `Rock.Blocks.Types.Mobile.Groups.GroupAttendanceEntry.DidNotMeet`
		- `Rock.Blocks.Types.Mobile.Groups.GroupAttendanceEntry.GetGroupData`
		- `Rock.Blocks.Types.Mobile.Groups.GroupAttendanceEntry.SaveAttendance`
		- `Rock.Blocks.Types.Mobile.Groups.GroupAttendanceEntry.SaveSingleAttendance`
	Changed the following fields from static to const:
	- `Rock.SystemGuid.ServiceJob.MIGRATE_COMMUNICATION_MEDIUM_DATA`
		- `Rock.SystemGuid.ServiceJob.MIGRATE_INTERACTIONS_DATA`
	`Rock.Jobs.GivingAnalytics.CreateAlertsForTransaction()` DateTime in the signature for parameter lastGiftDate is no longer nullable.
	The class `Rock.Lava.WebsiteLavaShortcodeProvider` is no longer static.

### 1.13.0.11 April 13, 2021

- There was a small change in `Rock.CheckIn.RosterAttendee` between Rock 12.3 and 12.4. The following method signatures have been updated to use the `RosterAttendeeAttendance` object instead of the `Attendance` object.
	- `bool AttendanceMeetsRosterStatusFilter(RosterAttendeeAttendance attendance, RosterStatusFilter rosterStatusFilter)`
		- `IList GetFromAttendanceList(IList attendanceList, GroupTypeCache selectedCheckinArea)`
		- `IList GetFromAttendanceList(IList attendanceList)`

### 1.13.0.9 March 17, 2021

- Moved the following classes to Namespace `Rock.Lava.RockLiquid.Blocks`
	- `Rock.Lava.Blocks.Cache`
		- `Rock.Lava.Blocks.CalendarEvents`
		- `Rock.Lava.Blocks.EventScheduledInstance`
		- `Rock.Lava.Blocks.Execute`
		- `Rock.Lava.Blocks.InteractionContentChannelItemWrite`
		- `Rock.Lava.Blocks.Javascript`
		- `Rock.Lava.Blocks.JsonProperty`
		- `Rock.Lava.Blocks.RockEntity`
		- `Rock.Lava.Blocks.Search`
		- `Rock.Lava.Blocks.Sql`
		- `Rock.Lava.Blocks.Stylesheet`
		- `Rock.Lava.Blocks.TagList`
		- `Rock.Lava.Blocks.WebRequest`
		- `Rock.Lava.Blocks.WorkflowActivate`
	Moved class `Rock.Utility.RockSerializableDictionary` to `Rock.Lava`

### 1.13.0.6 February 4, 2021

- public method `Rock.CheckIn.CheckinManagerHelper.SetSelectedCheckinAreaGuidToCookie(Nullable checkinAreaGuid)` has been renamed to `Rock.CheckIn.CheckinManagerHelper.SaveSelectedCheckinAreaGuidToCookie(Nullable checkinAreaGuid)`
	Removed v1.8 obsolete public method `List Rock.Model.PersonService.InactivatePerson(Person person, DefinedValueCache reason, string reasonNote)`. The replacement method `void Rock.Model.PersonService.InactivatePerson( Person person, DefinedValueCache inactiveReasonDefinedValue, string inactiveReasonNote )` returns void since history changes are handled by the Person model.

### 1.13.0.1 December 1, 2020

- Made the property `Rock.Model.CommunicationRecipient.PersonAliasId` nullable.
	Removed setter from property `Rock.Model.SchedulerResource.HasSchedulingConflict`. The property's value is now determined by checking the new property `Rock.Model.SchedulerResource.SchedulingConflicts` for any items. This new property is a List and holds any scheduling conflicts.
	Removed method `Rock.Reporting.DataFilter.Workflow.WorkflowAttributesFilter.workflowTypePicker_SelectItem`. Selection functionality will be performed during the ValueChanged event using `Rock.Reporting.DataFilter.Workflow.WorkflowAttributesFilter.workflowTypePicker_ValueChanged` instead of the SelectItem event.

## Rock 12.4 Released June 14, 2021

---

- The Following entity now has a `PurposeKey`. This new property is used in certain situations to further qualify a particular item. When attempting to find/match a following record you may want to include a `null` or `string.Empty` PurposeKey depending on your case/needs.
- #### Currency - 4/15/2021
	- A new "OrganizationStandardCurrencyCode" global attribute has been implemented (and is used by the `FormatAsCurrency` Lava filter, as such usage of the older "CurrencySymbol" global attribute is now deprecated starting with v13.
		- Use the CurrencyBox.Value property when setting the value of a currency (not the .Text property). It will also handle formatting the currency symbol as needed.
- #### Reports
	The Report Detail block has a new setting called "Add Administrate Security to Item Creator". When this is set to "Yes" then whoever created the Report will automatically have the security permission to edit and administrate it added. The default value for this setting is "No". The behavior of Rock prior to v12.4 was to automatically grant the Report creator "Administrate" and "Edit" permissions. As of v12.4 this will not happen unless the "Add Administrate Security to Item Creator" block setting is set to "Yes". **This release does NOT change the security permissions for any existing Reports.**
	If you would like to run a script to remove the existing "Administrate" and "Edit" permissions granted to the creaters we have some handy SQL scripts!
	This script will show all of the Persons where the Person is assigned "Edit" or "Administrate" permission and that same Person created the Report. It will NOT include permissions other than "Edit" or "Administrate", permissions assigned to a role, Disallow permissions, or permissions assigned to a Person that didn't create the Report. The permissions returned by this script are the permissions that the delete script will remove.
	-- Shows the creator permissions granted to Reports. This only for person level authorization and not security groups.
	DECLARE @reportEntityTypeId int = (SELECT \[Id\] FROM \[EntityType\] WHERE \[Guid\] = 'F1F22D3E-FEFA-4C84-9FFA-9E8ACE60FCE7')
	SELECT r.\[Name\] AS ReportName, p.\[LastName\] AS PersonLastName, p.\[FirstName\] AS PersonFirstName, a.\*
	FROM \[Auth\] a
	JOIN \[Report\] r on a.\[EntityId\] = r.\[Id\]
	JOIN \[PersonAlias\] pa on a.\[PersonAliasId\] = pa.\[Id\]
	JOIN \[Person\] p on pa.\[PersonId\] = p.\[Id\]
	WHERE a.\[EntityTypeId\] = @reportEntityTypeId
	    AND a.\[Action\] IN ('Edit', 'Administrate')
	    AND a.\[AllowOrDeny\] = 'A'
	    AND r.\[CreatedByPersonAliasId\] = a.PersonAliasId
	ORDER BY r.\[Name\], p.\[LastName\], p.\[FirstName\]
	          
	Here is the DELETE script. It will remove all of the Report security settings for Persons where the Person is assigned "Edit" or "Administrate" permission and that same Person created the Report. It will NOT delete permissions other than "Edit" or "Administrate", permissions assigned to a role, Disallow permissions, or permissions assigned to a Person that didn't create the Report.
	After running this script Report edit and administration security access will be dependent on Roles and the Users explicitly assigned the permissions after creating the Report.
	-- Removes the creator permissions granted to Reports. This only affects person level authorization and not security groups.
	DECLARE @reportEntityTypeId int = (SELECT \[Id\] FROM \[EntityType\] WHERE \[Guid\] = 'F1F22D3E-FEFA-4C84-9FFA-9E8ACE60FCE7')
	DELETE FROM \[Auth\]
	WHERE \[Id\] IN (
		SELECT a.\[Id\]
		FROM \[Auth\] a
		JOIN \[Report\] r on a.\[EntityId\] = r.\[Id\]
		WHERE a.\[EntityTypeId\] = @reportEntityTypeId
			AND a.\[Action\] IN ('Edit', 'Administrate')
			AND a.\[AllowOrDeny\] = 'A'
			AND r.\[CreatedByPersonAliasId\] = a.\[PersonAliasId\])
	        
	NOTE: After running the delete script, you will need to clear the cache for the changes to effect the Rock web application.
- #### DataViews
	The Data View Detail block has a new setting called "Add Administrate Security to Item Creator". When this is set to "Yes" then whoever created the Data View will automatically have the security permission to edit and administrate it added. The default value for this setting is "No". The behavior of Rock prior to v12.4 was to automatically grant the Data View creator "Administrate" and "Edit" permissions. As of v12.4 this will not happen unless the "Add Administrate Security to Item Creator" block setting is set to "Yes". **This release does NOT change the security permissions for any existing Data Views.**
	If you would like to run a script to remove the existing "Administrate" and "Edit" permissions granted to the creaters we have some handy SQL scripts!
	This script will show all of the Persons where the Person is assigned "Edit" or "Administrate" permission and that same Person created the Data View. It will NOT include permissions other than "Edit" or "Administrate", permissions assigned to a role, Disallow permissions, or permissions assigned to a Person that didn't create the Data View. The permissions returned by this script are the permissions that the delete script will remove.
	-- Shows the creator permissions granted to DataViews. This only for person level authorization and not security groups.
	DECLARE @dataViewEntityTypeId int = (SELECT \[Id\] FROM \[EntityType\] WHERE \[Guid\] = '57F8FA29-DCF1-4F74-8553-87E90F234139')
	SELECT dv.\[Name\] AS ReportName, p.\[LastName\] AS PersonLastName, p.\[FirstName\] AS PersonFirstName, a.\*
	FROM \[Auth\] a
	JOIN \[DataView\] dv on a.\[EntityId\] = dv.\[Id\]
	JOIN \[PersonAlias\] pa on a.\[PersonAliasId\] = pa.\[Id\]
	JOIN \[Person\] p on pa.\[PersonId\] = p.\[Id\]
	WHERE a.\[EntityTypeId\] = @dataViewEntityTypeId
		AND a.\[Action\] IN ('Edit', 'Administrate')
		AND a.\[AllowOrDeny\] = 'A'
		AND dv.\[CreatedByPersonAliasId\] = a.PersonAliasId
	ORDER BY dv.\[Name\], p.\[LastName\], p.\[FirstName\]
	          
	Here is the DELETE script. It will remove all of the Data View security settings for Persons where the Person is assigned "Edit" or "Administrate" permission and that same Person created the Data View. It will NOT delete permissions other than "Edit" or "Administrate", permissions assigned to a role, Disallow permissions, or permissions assigned to a Person that didn't create the Data View.
	After running this script Data View edit and administration security access will be dependent on Roles and the Users explicitly assigned the permissions after creating the Data View.
	-- Removes the creator permissions granted to DataViews. This only affects person level authorization and not security groups.
	DECLARE @dataViewEntityTypeId int = (SELECT \[Id\] FROM \[EntityType\] WHERE \[Guid\] = '57F8FA29-DCF1-4F74-8553-87E90F234139')
	DELETE FROM \[Auth\]
	WHERE \[Id\] IN (
		SELECT a.\[Id\]
		FROM \[Auth\] a
		JOIN \[DataView\] dv on a.\[EntityId\] = dv.\[Id\]
		WHERE a.\[EntityTypeId\] = @dataViewEntityTypeId
			AND a.\[Action\] IN ('Edit', 'Administrate')
			AND a.\[AllowOrDeny\] = 'A'
			AND dv.\[CreatedByPersonAliasId\] = a.\[PersonAliasId\])
	        
	NOTE: After running the delete script, you will need to clear the cache for the changes to effect the Rock web application.

## Rock 12.1 Released March 1, 2021

---

#### Groups

- The GroupDetail block has new setting called "Add Administrate Security to Group Creator". When this is set to "Yes" then whoever created the group will automatically have the security permission to administrate the group added. The default value for this setting is "No". The behavior of Rock prior to v12.1 was to automatically grant the Group creator "Administrate" permission. As of v12.1 this will not happen unless the "Add Administrate Security to Group Creator" block setting is set to "Yes". **This release does NOT change the security permissions for any existing Groups.**
	If you would like to run a script to remove the existing "Administrate" group permissions granted to the group creater we have some handy SQL scripts!
	This script will show all of the Group/Persons where the Person is assigned "Administrate" permission and that same Person created the Group. It will NOT include permissions other than "Administrate", permissions assigned to a role, Disallow permissions, or permissions assigned to a Person that didn't create the group. The permissions returned by this script are the permissions that the delete script will remove.
	DECLARE @selectGroupEntityId int = (SELECT \[Id\] FROM \[EntityType\] WHERE \[Guid\] = '9BBFDA11-0D22-40D5-902F-60ADFBC88987')
	SELECT g.\[Name\] AS GroupName, p.\[LastName\] AS PersonLastName, p.\[FirstName\] AS PersonFirstName, a.\*
	FROM \[Auth\] a
	JOIN \[Group\] g on a.\[EntityId\] = g.\[Id\]
	JOIN \[PersonAlias\] pa on a.\[PersonAliasId\] = pa.\[Id\]
	JOIN \[Person\] p on pa.\[PersonId\] = p.\[Id\]
	WHERE \[EntityTypeId\] = @selectGroupEntityId
		AND a.\[Action\] = 'Administrate'
		AND a.\[AllowOrDeny\] = 'A'
		AND g.\[CreatedByPersonAliasId\] = a.PersonAliasId
	ORDER BY g.\[Name\], p.\[LastName\], p.\[FirstName\]
	      
	Here is the DELETE script. It will remove all of the Group/Person security settings where the Person is assigned "Administrate" permission and that same Person created the Group. It will NOT delete permissions other than "Administrate", permissions assigned to a role, Disallow permissions, or permissions assigned to a Person that didn't create the group.
	After running this script Group administration security access will be dependent on Roles and the Users explicitly assigned "Administrate" permission after creating the Group.
	DECLARE @groupEntityId int = (SELECT \[Id\] FROM \[EntityType\] WHERE \[Guid\] = '9BBFDA11-0D22-40D5-902F-60ADFBC88987')
	DELETE FROM \[Auth\]
	WHERE \[Id\] IN (
		SELECT a.\[Id\]
		FROM \[Auth\] a
		JOIN \[Group\] g on a.\[EntityId\] = g.\[Id\]
		WHERE \[EntityTypeId\] = @groupEntityId
			AND a.\[Action\] = 'Administrate'
			AND a.\[AllowOrDeny\] = 'A'
			AND g.\[CreatedByPersonAliasId\] = a.\[PersonAliasId\])
	    
	NOTE: After running the delete script, you will need to clear the cache for the changes to effect the Rock web application.

## Rock 12.0 Released January 4, 2021

---

- The DDay.iCal library has been replaced with the ICal.Net library. Because of this, the `ScheduleICalHelper` class is being replaced with `InetCalendarHelper` and certain helper methods in the Schedule.cs class which returned either `DDay.iCal.Event` or `IList<DDay.iCal.Occurrence>` are obsoleted:
	- `GetCalendarEvent()` replaced with `GetICalEvent()`
		- `GetOccurrences(...)` is replaced with `GetICalOccurrences(...)`
- The `WorkflowLogService` is being removed and the `WorkflowLog` model is being changed to no longer inherit from Model to reduce size and increase performance; as such it will no longer have the following properties/columns (ForeignId, ForeignGuid, ForeignKey, Guid, CreatedDateTime, ModifiedDateTime, CreatedByPersonAliasId, ModifiedByPersonAliasId).
- If you are using a CI/CD system such as AppVeyor, you may need to add this to your build init to deal with [the MSB3268 warning](https://stackoverflow.com/questions/48118263/asp-net-web-site-builds-locally-but-throws-msb3268-on-the-build-server):COPY "C:\\Program Files (x86)\\Reference Assemblies\\Microsoft\\Framework\\.NETFramework\\v4.5.2\\Facades\\System.IO.dll" "C:\\Program Files (x86)\\Reference Assemblies\\Microsoft\\Framework\\.NETFramework\\v4.5.2"
	COPY "C:\\Program Files (x86)\\Reference Assemblies\\Microsoft\\Framework\\.NETFramework\\v4.5.2\\Facades\\System.Linq.Expressions.dll" "C:\\Program Files (x86)\\Reference Assemblies\\Microsoft\\Framework\\.NETFramework\\v4.5.2"
	COPY "C:\\Program Files (x86)\\Reference Assemblies\\Microsoft\\Framework\\.NETFramework\\v4.5.2\\Facades\\System.ComponentModel.dll" "C:\\Program Files (x86)\\Reference Assemblies\\Microsoft\\Framework\\.NETFramework\\v4.5.2"
	COPY "C:\\Program Files (x86)\\Reference Assemblies\\Microsoft\\Framework\\.NETFramework\\v4.5.2\\Facades\\System.Threading.Tasks.dll" "C:\\Program Files (x86)\\Reference Assemblies\\Microsoft\\Framework\\.NETFramework\\v4.5.2"
	COPY "C:\\Program Files (x86)\\Reference Assemblies\\Microsoft\\Framework\\.NETFramework\\v4.5.2\\Facades\\System.Collections.Concurrent.dll" "C:\\Program Files (x86)\\Reference Assemblies\\Microsoft\\Framework\\.NETFramework\\v4.5.2"
- To make way for better dynamic badges that can be used within the new Connections Board, custom badges should be refactored to eliminate injecting any needed `script` blocks in the badge that would have called `Sys.Application.add_load`. Instead, override the BadgeComponent's GetJavaScript() method and return your javascript there. See commits [970b0c1](https://github.com/sparkdevnetwork/rock/commit/970b0c18aad64fc4dc17815cbf83b6d55097c639) and [e56d506](https://github.com/sparkdevnetwork/rock/commit/e56d506642d185f305efa6cedc036aecc0e06458) for examples of this.
- FYI: Several changes are needed in the `web.config` to support OpenId server. This is handled by the RockUpdate process, but if you're merging and building manually (or via some non-RockUpdate process), you'll need to make sure the repo's `web.config` changes are applied to your server's `web.config`.

### 1.12.0.9 November 10, 2020

- The setter for property `Rock.Model.Page.OutputCacheDuration` has been made private. This property is obsolete and set programmically using the new `CacheControlHeader` property.
	Made the property `Rock.Web.UI.Controls.PersonBasicEditor.PersonGender` nullable.
	Changed the setters for the following Cache object properties to private.
	- `public property Rock.Web.Cache.AssessmentTypeCache.AssessmentPath`
		- `public property Rock.Web.Cache.AssessmentTypeCache.AssessmentResultsPath`
		- `public property Rock.Web.Cache.AssessmentTypeCache.BadgeColor`
		- `public property Rock.Web.Cache.AssessmentTypeCache.BadgeSummaryLava`
		- `public property Rock.Web.Cache.AssessmentTypeCache.Description`
		- `public property Rock.Web.Cache.AssessmentTypeCache.IconCssClass`
		- `public property Rock.Web.Cache.AssessmentTypeCache.IsActive`
		- `public property Rock.Web.Cache.AssessmentTypeCache.IsSystem`
		- `public property Rock.Web.Cache.AssessmentTypeCache.MinimumDaysToRetake`
		- `public property Rock.Web.Cache.AssessmentTypeCache.RequiresRequest`
		- `public property Rock.Web.Cache.AssessmentTypeCache.Title`
		- `public property Rock.Web.Cache.AttributeCache.IsPublic`
		- `public property Rock.Web.Cache.DocumentTypeCache.BinaryFileTypeId`
		- `public property Rock.Web.Cache.DocumentTypeCache.DefaultDocumentNameTemplate`
		- `public property Rock.Web.Cache.DocumentTypeCache.Name`
		- `public property Rock.Web.Cache.EntityAttributesCache.EntityAttributes`
		- `public property Rock.Web.Cache.EntityAttributesCache.EntityAttributesByEntityTypeId`
		- `public property Rock.Web.Cache.EntityDocumentTypesCache.EntityDocumentTypes`
		- `public property Rock.Web.Cache.EntityNoteTypesCache.EntityNoteTypes`
		- `public property Rock.Web.Cache.GroupTypeCache.RSVPReminderOffsetDays`
		- `public property Rock.Web.Cache.GroupTypeCache.RSVPReminderSystemCommunicationId`
		- `public property Rock.Web.Cache.LayoutCache.LayoutMobilePhone`
		- `public property Rock.Web.Cache.LayoutCache.LayoutMobileTablet`
		- `public property Rock.Web.Cache.NoteTypeCache.AllowsReplies`
		- `public property Rock.Web.Cache.NoteTypeCache.AllowsWatching`
		- `public property Rock.Web.Cache.NoteTypeCache.ApprovalUrlTemplate`
		- `public property Rock.Web.Cache.NoteTypeCache.AutoWatchAuthors`
		- `public property Rock.Web.Cache.NoteTypeCache.BackgroundColor`
		- `public property Rock.Web.Cache.NoteTypeCache.BorderColor`
		- `public property Rock.Web.Cache.NoteTypeCache.FontColor`
		- `public property Rock.Web.Cache.NoteTypeCache.MaxReplyDepth`
		- `public property Rock.Web.Cache.NoteTypeCache.RequiresApprovals`
		- `public property Rock.Web.Cache.NoteTypeCache.SendApprovalNotifications`
		- `public property Rock.Web.Cache.PersistedDatasetCache.BuildScript`
		- `public property Rock.Web.Cache.PersistedDatasetCache.BuildScriptType`
		- `public property Rock.Web.Cache.PersistedDatasetCache.EntityTypeId`
		- `public property Rock.Web.Cache.PersistedDatasetCache.ExpireDateTime`
		- `public property Rock.Web.Cache.PersistedDatasetCache.IsActive`
		- `public property Rock.Web.Cache.PersistedDatasetCache.IsSystem`
		- `public property Rock.Web.Cache.PersistedDatasetCache.MemoryCacheDurationMS`
		- `public property Rock.Web.Cache.PersistedDatasetCache.ResultFormat`
		- `public property Rock.Web.Cache.PersistedDatasetCache.TimeToBuildMS`
		- `public property Rock.Web.Cache.SiteCache.AdditionalSettings`
		- `public property Rock.Web.Cache.SiteCache.ConfigurationMobilePhoneBinaryFileId`
		- `public property Rock.Web.Cache.SiteCache.ConfigurationMobilePhoneFileUrl`
		- `public property Rock.Web.Cache.SiteCache.ConfigurationMobileTabletBinaryFileId`
		- `public property Rock.Web.Cache.SiteCache.ConfigurationMobileTabletFileUrl`
		- `public property Rock.Web.Cache.SiteCache.EnableExclusiveRoutes`
		- `public property Rock.Web.Cache.SiteCache.IsActive`
		- `public property Rock.Web.Cache.SiteCache.LatestVersionDateTime`
		- `public property Rock.Web.Cache.SiteCache.SiteType`
		- `public property Rock.Web.Cache.SiteCache.ThumbnailBinaryFileId`
		- `public property Rock.Web.Cache.SiteCache.ThumbnailFileUrl`
		- `public property Rock.Web.Cache.SmsActionCache.ContinueAfterProcessing`
		- `public property Rock.Web.Cache.SmsActionCache.IsActive`
		- `public property Rock.Web.Cache.SmsActionCache.Name`
		- `public property Rock.Web.Cache.SmsActionCache.Order`
		- `public property Rock.Web.Cache.SmsActionCache.SmsActionComponentEntityTypeId`
		- `public property Rock.Web.Cache.SmsActionCache.SmsPipelineId`

### 1.12.0.6 September 29, 2020

- No breaking changes in this release

### 1.12.0.3 August 18, 2020

- Deleted field `Rock.DebugHelper._callMSTotal`. Use property `Rock.DebugHelper.CallMSTotal` instead.
	Property `Rock.Achievement.AchievementComponent.AttributeKeysStoredInConfig` has been changed from abstract to readonly.
	Property `Rock.Achievement.AchievementComponent.SupportedConfiguration` has been changed from abstract to readonly.

### 1.12.0.2 August 4, 2020

- Achievements have been expanded to be used for other things besides Streaks. The following breaking changes have been made to support this:
	- The following classes have been removed
		- `Rock.Model.StreakAchievementAttempt` use `Rock.Model.AchievementAttempt` instead
				- `Rock.Model.StreakAchievementAttemptExtensionMethods` use `Rock.Model.AchievementAttemptExtensionMethods` instead
				- `Rock.Model.StreakAchievementAttemptService` use `Rock.Model.AchievementAttemptService` instead
				- `Rock.Model.StreakTypeAchievementType` use `Rock.Model.AchievementType` instead
				- `Rock.Model.StreakTypeAchievementTypeExtensionMethods` use `Rock.Model.AchievementTypeExtensionMethods` instead
				- `Rock.Model.StreakTypeAchievementTypePrerequisite` use `Rock.Model.AchievementTypePrerequisite` instead
				- `Rock.Model.StreakTypeAchievementTypePrerequisiteExtensionMethods` use `Rock.Model.AchievementTypePrerequisiteExtensionMethods` instead
				- `Rock.Model.StreakTypeAchievementTypePrerequisiteService` use `Rock.Model.AchievementTypePrerequisiteService` instead
				- `Rock.Model.StreakTypeAchievementTypeService` use `Rock.Model.AchievementTypeService` instead
				- `Rock.Transactions.StreakAchievementAttemptChangeTransaction` use `Rock.Transactions.AchievementAttemptChangeTransaction` instead
				- `Rock.Web.Cache.StreakTypeAchievementTypeCache` use `Rock.Web.Cache.AchievementTypeCache` instead
				- `Rock.Web.Cache.StreakTypeAchievementTypePrerequisiteCache` use `Rock.Web.Cache.AchievementTypePrerequisiteCache` instead
				- `Rock.Web.UI.Controls.AchievementComponentPicker` This control is no longer used.
				- `Rock.Web.UI.Controls.IStreakTypeAchievementTypePicker` use `Rock.Web.UI.Controls.IAchievementTypePicker` instead
				- `Rock.Web.UI.Controls.StreakTypeAchievementTypePicker` use `Rock.Web.UI.Controls.AchievementTypePicker` instead
				- `Rock.Rest.Controllers.StreakAchievementAttemptsController` use `Rock.Rest.Controllers.AchievementAttemptsController` instead
				- `Rock.Rest.Controllers.StreakTypeAchievementTypePrerequisitesController` use `Rock.Rest.Controllers.AchievementTypePrerequisitesController` instead
				- `Rock.Rest.Controllers.StreakTypeAchievementTypesController` use `Rock.Rest.Controllers.AchievementTypesController` instead
		- The Following Constructors have been changed to use AchievementType instead of StreakTypeAchievementType in the signature
		- public method Rock.Model.ProgressStatement(AchievementTypeCache achievementTypeCache)
		- The following methods have been changed to use AchievementType instead of StreakTypeAchievementType in the signature
		- `Rock.Achievement.AchievementComponent.LoadAttributes(AchievementType achievementType)`
				- `Rock.Achievement.AchievementComponent.Process(RockContext rockContext, AchievementTypeCache achievementTypeCache, IEntity sourceEntity)`
		- The following method signatures have changed to add `bool returnAchievements = False`
		- `Rock.Rest.Controllers.StreakTypesController.MarkAttendanceEngagement(int streakTypeId, AttendanceEngagementArgs attendanceEngagementArgs, int? personId, DateTime? dateOfEngagement, bool returnAchievements = False)`
				- `Rock.Rest.Controllers.StreakTypesController.MarkInteractionEngagement(int streakTypeId, InteractionEngagementArgs interactionEngagementArgs, int? personId, DateTime? dateOfEngagement, bool returnAchievements = False)`
		- The following properties changed from type StreakAchievementAttempt to AchievementAttempt
		- `public property Rock.Model.ProgressStatement.BestAttempt`
				- `public property Rock.Model.ProgressStatement.MostRecentAttempt`
		- The following properties have been removed
		Rock.Model.StepType.StreakTypeAchievementTypes Rock.Model.Streak.StreakAchievementAttempts is no longer used Rock.Model.StreakType.StreakTypeAchievementTypes is no longer used Rock.Web.Cache.StreakTypeCache.StreakTypeAchievementTypes is no longer used
	The following classes have been removed as part of and updated Workflow Logging process:
	- `Rock.Rest.Controllers.WorkflowLogsController`
		- `Rock.Model.WorkflowLogExtensionMethods`
		- `Rock.Model.WorkflowLogService`

### 1.12.0.1 July 21, 2020

- There are no breaking changes in this release.

## Rock 11.0 Released July 22, 2020

---

Starting with v11...
- Rock will require SQL Server 2014 or higher. Read [our notification](https://www.rockrms.com/page/470?Item=1606).
- Our developer solution will require Visual Studio 2019.
- Classes, methods, and properties marked "Obsolete" as of version v7 `[RockObsolete("1.7")]` have been removed.
- We have updated the Newtonsoft Json.NET library (Newtonsoft.Json.dll) from version 9.0.1 to version 11.0.2. (You can find [those release notes](https://github.com/JamesNK/Newtonsoft.Json/releases) on their github page.)
- The `SystemEmail` entity (model and table) is now obsolete.
- Updated RockWeb to use the Roslyn compiler (to enable future C# v6 and v7 features in Rock v12-- *don't* start using .Net v6/7 features until then)
- The `ChannelId` property was renamed to `InteractionChannelId` on the InteractionComponent model and database table. This will affect any raw SQL you might have that references ChannelId directly *and any plugins that create their own interaction components directly via SQL*.
- Changed the `RelatedDataViewFilterBase` abstract class to implement a new internal `IRelatedChildDataView` interface. This interface has a method that returns the DataView.Id that is selected to use. When data view filters are being saved, if it implements the interface, it would call that method to return the Id of the Data View that it is referencing.
- Some small changes in Rock's stock push notification component were made to extend the usefulness of PUSH messages in Rock. 3rd party developers who are extending the `PushNotification` class should recompile their code to verify compatibility.
- Updated to FontAwesome 5.13.0

### 1.11.0.20 July 7, 2020

- There are no breaking changes in this release.

### 1.11.0.19 June 23, 2020

- Removed the setter for `public property Rock.Storage.AssetStorage.AssetStorageComponent.FileSystemComponentHttpContext`. This property will always use HttpContext.Current

### 1.11.0.18 June 9, 2020

- Removed property `Rock.Model.CommunicationTemplate.Mediums`

### 1.11.0.17 May 26, 2020

- `public field Rock.Communication.Transport.Twilio.AcceptedMimeTypes` was changed from a static list to a readonly static list.
	`public field Rock.Communication.Transport.Twilio.MediaSizeLimitBytes` was changed from a static int to a const int with value 5242880.
	`public field Rock.Communication.Transport.Twilio.SupportedMimeTypes` was changed from a static list to a readonly static list.

### 1.11.0.16 May 12, 2020

- Updated the following constant values:
	- `public field Rock.Blocks.Types.Mobile.Events.CalendarEventList.AttributeDefaults.DayHeaderTemplate`
		From: " "
		To: ""
		- `public field Rock.Blocks.Types.Mobile.Events.CalendarEventList.AttributeDefaults.EventTemplate`
		From: " {% if Item.EndDateTime == null %} {% else %} {% endif %} "
		To: " {% if Item.EndDateTime == null %} {% else %} {% endif %} "
		- `public field Rock.Blocks.Types.Mobile.Events.CalendarView.AttributeDefaults.EventSummary`
		From: " {% if Item.EndDateTime == null %} {% else %} {% endif %} "
		To: " {% if Item.EndDateTime == null %} {% else %} {% endif %} "
	Removed `public class Rock.Blocks.Types.Mobile.Cms.ContentChannelItemList`
	Removed `property public decimal SpacingBase` from class `public property Rock.DownhillCss.DownhillSettings`

### 1.11.0.13 March 31, 2020

- No "C# code" breaking changes in this release, however the `ChannelId` property was renamed to `InteractionChannelId` on the InteractionComponent model and database table. Although you can still access ChannelId through C# code during the obsolete period, this change will adversely affect any raw SQL you created that references ChannelId directly.

### 1.11.0.5 December 4, 2019

- Removed the public property setter on `Rock.Web.Cache.GlobalAttributesCache.Attributes`. This was to fix cache issues in a multi server environment.

### 1.11.0.4 November 12, 2019

- Classes, Methods, and Properties marked "Obsolete" in version 7 have been removed. The following are no longer available:
	- `public property Rock.CheckIn.CheckinType.PreventInactivePeopele`
		- Use PreventInactivePeople instead.
		- `public method Rock.Communication.Email.Send(Guid emailTemplateGuid, List recipients, string appRoot = "", string themeRoot = "", bool createCommunicationHistory = True)`
		- Use the RockEmailMessage object and its Send() method to send emails.
		- `public method Rock.Communication.Email.Send(string fromEmail, string subject, List recipients, string message, string appRoot = "", string themeRoot = "", List attachments, bool createCommunicationHistory = True)`
		- Use the RockEmailMessage object and its Send() method to send emails.
		- `public method Rock.Communication.Email.Send(string fromEmail, string fromName, string subject, List recipients, string message, string appRoot = "", string themeRoot = "", List attachments, bool createCommunicationHistory = True)`
		- Use the RockEmailMessage object and its Send() method to send emails.
		- `public method Rock.Communication.MediumComponent.GetHtmlPreview(Communication communication, Person person)`
		- The GetCommunication now creates the HTML Preview directly
		- `public method Rock.Communication.MediumComponent.GetMessageDetails(Communication communication)`
		- The CommunicationDetail block now creates the details
		- `public property Rock.Communication.MediumComponent.SupportsBulkCommunication`
		- All mediums now support bulk communications
		- `public method Rock.Communication.TransportComponent.Send(Communication communication)`
		- Use Send( Communication communication, Dictionary mediumAttributes ) instead
		- `public method Rock.Communication.TransportComponent.Send(SystemEmail template, List recipients, string appRoot, string themeRoot)`
		- Use Send( RockMessage message, out List errorMessage ) method instead
		- `public method Rock.Communication.TransportComponent.Send(Dictionary mediumData, List recipients, string appRoot, string themeRoot)`
		- Use Send( RockMessage message, out List errorMessage ) method instead
		- `public method Rock.Communication.TransportComponent.Send(List recipients, string from, string subject, string body, string appRoot, string themeRoot)`
		- Use Send( RockMessage message, out List errorMessage ) method instead
		- `public method Rock.Communication.TransportComponent.Send(List recipients, string from, string subject, string body, string appRoot, string themeRoot, List attachments)`
		- Use Send( RockMessage message, out List errorMessage ) method instead
		- `public method Rock.Communication.TransportComponent.Send(List recipients, string from, string fromName, string subject, string body, string appRoot, string themeRoot, List attachments)`
		- Use Send( RockMessage message, out List errorMessage ) method instead
		- `public method Rock.Communication.Medium.Email.GetHtmlPreview(Communication communication, Person person)`
		- The GetCommunication now creates the HTML Preview directly
		- `public method Rock.Communication.Medium.Email.GetMessageDetails(Communication communication)`
		- The CommunicationDetail block now creates the details
		- `public property Rock.Communication.Medium.Email.SupportsBulkCommunication`
		- All mediums now support bulk communications
		- `public method Rock.Communication.Medium.Sms.GetHtmlPreview(Communication communication, Person person)`
		- The GetCommunication now creates the HTML Preview directly
		- `public method Rock.Communication.Medium.Sms.GetMessageDetails(Communication communication)`
		- The CommunicationDetail block now creates the details
		- `public property Rock.Communication.Medium.Sms.SupportsBulkCommunication`
		- All mediums now support bulk communications
		- `public method Rock.Communication.Transport.SMTPComponent.Send(List recipients, string from, string fromName, string subject, string body, string appRoot, string themeRoot, List attachments, bool createCommunicationHistory)`
		- Use Send( RockMessage message, out List errorMessage ) method instead
		- `public method Rock.Communication.Transport.SMTPComponent.Send(List recipients, string from, string fromName, string subject, string body, string appRoot, string themeRoot, List attachments)`
		- Use Send( RockMessage message, out List errorMessage ) method instead
		- `public method Rock.Communication.Transport.SMTPComponent.Send(List recipients, string from, string subject, string body, string appRoot, string themeRoot, List attachments)`
		- Use Send( RockMessage message, out List errorMessage ) method instead
		- `public method Rock.Communication.Transport.SMTPComponent.Send(List recipients, string from, string subject, string body, string appRoot, string themeRoot)`
		- Use Send( RockMessage message, out List errorMessage ) method instead
		- `public method Rock.Communication.Transport.SMTPComponent.Send(Dictionary mediumData, List recipients, string appRoot, string themeRoot, bool createCommunicationHistory, Dictionary metaData)`
		- Use Send( RockMessage message, out List errorMessage ) method instead
		- `public method Rock.Communication.Transport.SMTPComponent.Send(Dictionary mediumData, List recipients, string appRoot, string themeRoot, bool createCommunicationHistory)`
		- Use Send( RockMessage message, out List errorMessage ) method instead
		- `public method Rock.Communication.Transport.SMTPComponent.Send(SystemEmail template, List recipients, string appRoot, string themeRoot)`
		- Use Send( RockMessage message, out List errorMessage ) method instead
		- `public method Rock.Communication.Transport.SMTPComponent.Send(SystemEmail template, List recipients, string appRoot, string themeRoot, bool createCommunicationHistory)`
		- Use Send( RockMessage message, out List errorMessage ) method instead
		- `public method Rock.Communication.Transport.SMTPComponent.Send(Communication communication)`
		- Use Send( Communication communication, Dictionary mediumAttributes ) instead
		- `public method Rock.Communication.Transport.SMTPComponent.Send(Dictionary mediumData, List recipients, string appRoot, string themeRoot)`
		- Use Send( RockMessage message, out List errorMessage ) method instead
		- `public method Rock.Communication.Transport.Twilio.Send(List recipients, string from, string fromName, string subject, string body, string appRoot, string themeRoot, List attachments)`
		- Use Send( RockMessage message, out List errorMessage ) method instead
		- `public method Rock.Communication.Transport.Twilio.Send(List recipients, string from, string subject, string body, string appRoot, string themeRoot, List attachments)`
		- Use Send( RockMessage message, out List errorMessage ) method instead
		- `public method Rock.Communication.Transport.Twilio.Send(List recipients, string from, string subject, string body, string appRoot, string themeRoot)`
		- Use Send( RockMessage message, out List errorMessage ) method instead
		- `public method Rock.Communication.Transport.Twilio.Send(Dictionary mediumData, List recipients, string appRoot, string themeRoot)`
		- Use Send( RockMessage message, out List errorMessage ) method instead
		- `public method Rock.Communication.Transport.Twilio.Send(Communication communication)`
		- Use Send( Communication communication, Dictionary mediumAttributes ) instead
		- `public method Rock.Communication.Transport.Twilio.Send(SystemEmail template, List recipients, string appRoot, string themeRoot)`
		- Use Send( RockMessage message, out List errorMessage ) method instead
		- `public interface Rock.Data.IAnalytic`
		- Decorate with \[Analytics\] instead
		- `public interface Rock.Data.IAnalyticHistorical`
		- Decorate with \[Analytics\] instead
		- `public field Rock.SystemGuid.ServiceJob.MIGRATE_COMMUNICATION_MEDIUM_DATA`
		- This was used for migration of pre v7 data and is no longer needed.
		- `public field Rock.SystemGuid.ServiceJob.MIGRATE_INTERACTIONS_DATA`
		- This was used for migration of pre v7 data and is no longer needed.
		- `public class Rock.Jobs.MigrateCommunicationMediumData`
		- This was used for migration of pre v7 data and is no longer needed.
		- `public class Rock.Jobs.MigrateInteractionsData`
		- This was used for migration of pre v7 data and is no longer needed.
		- `public method Rock.Lava.LavaHelper.GetPagePropertiesMergeObject(RockPage rockPage)`
		- Just use the PageCache of the CurrentPage instead
		- `public method Rock.Lava.LegacyLavaUpdater.CheckCommunicationTemplate()`
		- The Communication.MediumDataJson and CommunicationTemplate.MediumDataJson fields will be removed in Rock 1.10
		- `public property Rock.Model.BackgroundCheck.ResponseXml`
		- Use ResponseData Instead
		- `public method Rock.Model.Communication.GetMediumDataValue(string key)`
		- MediumData is no longer used
		- `public method Rock.Model.Communication.GetNextPending(int communicationId, RockContext rockContext)`
		- Use GetNextPending( int communicationId, int mediumEntityId, Rock.Data.RockContext rockContext ) instead.
		- `public method Rock.Model.Communication.GetRecipientCount(RockContext rockContext)`
		- This can return incorrect results if Recipients has been modified and not saved to the database. So don't use this.
		- `public property Rock.Model.Communication.MediumData`
		- MediumData is no longer used. Communication now has specific properties for medium data.
		- `public method Rock.Model.Communication.SetMediumDataValue(string key, string value)`
		- MediumData is no longer used
		- `public method Rock.Model.CommunicationService.CreateEmailCommunication(List recipientEmails, string fromName, string fromAddress, string replyTo, string subject, string htmlMessage, string textMessage, bool bulkCommunication, CommunicationRecipientStatus recipientStatus = 1, int? senderPersonAliasId)`
		- Use method without textMessage argument
		- `public method Rock.Model.CommunicationService.CreateEmailCommunication(List recipientEmails, string fromName, string fromAddress, string replyTo, string subject, string message, bool bulkCommunication, CommunicationRecipientStatus recipientStatus = 1, int? senderPersonAliasId)`
		- Use method with send date time argument
		- `public property Rock.Model.CommunicationTemplate.AttachmentBinaryFileIds`
		- Use EmailAttachmentBinaryFileIds or SMSAttachmentBinaryFileIds
		- `public method Rock.Model.CommunicationTemplate.GetMediumDataValue(string key)`
		- MediumData is no longer used
		- `public property Rock.Model.CommunicationTemplate.MediumData`
		- MediumData is no longer used. Communication Template now has specific properties for medium data.
		- `public method Rock.Model.CommunicationTemplate.SetMediumDataValue(string key, string value)`
		- MediumData is no longer used
		- `public method Rock.Model.FinancialPaymentDetail.SetFromPaymentInfo(PaymentInfo paymentInfo, GatewayComponent paymentGateway, RockContext rockContext, List changes)`
		- Use other SetFromPaymentInfo
		- `public method Rock.Model.FinancialScheduledTransactionService.ProcessPayments(FinancialGateway gateway, string batchNamePrefix, List payments, string batchUrlFormat = "", Nullable receiptEmail)`
		- Use method with failed payment email and workflow type parameters
		- `public property Rock.Model.Group.MustMeetRequirementsToAddMember`
		- This no longer is functional. Please use GroupRequirement.MustMeetRequirementToAddMember instead.
		- `public method Rock.Model.Group.PersonMeetsGroupRequirements(int personId, int? groupRoleId)`
		- Use PersonMeetsGroupRequirements(rockContext, personId, groupRoleId) instead
		- `public method Rock.Model.GroupMember.GetGroupRequirementsStatuses()`
		- Use GetGroupRequirementsStatuses(rockContext) instead
		- `public method Rock.Model.GroupRequirement.PersonMeetsGroupRequirement(int personId, int? groupRoleId)`
		- Use PersonMeetsGroupRequirement(personId, groupId, groupRoleId) instead
		- `public method Rock.Model.GroupRequirement.PersonQueryableMeetsGroupRequirement(RockContext rockContext, IQueryable personQry, int? groupRoleId)`
		- Use PersonQueryableMeetsGroupRequirement(rockContxt, personQry, groupId, groupRoleId) instead
		- `public method Rock.Model.GroupRequirement.UpdateGroupMemberRequirementResult(RockContext rockContext, int personId, MeetsGroupRequirement meetsGroupRequirement)`
		- Use UpdateGroupMemberRequirementResult(rockContext, personId, groupId, meetsGroupRequirement) instead
		- `public method Rock.Model.GroupService.GroupMembersNotMeetingRequirements(int groupId, bool includeWarnings, bool includeInactive = False)`
		- Use GroupMembersNotMeetingRequirements( roup, includeWarnings, includeInactive) instead
		- `public property Rock.Model.PersonalDevice.PersonalDeviceTypeId`
		- Use PersonalDeviceTypeValueId instead.
		- `public method Rock.Model.PersonService.GetByEncryptedKey(string encryptedKey, bool followMerges)`
		- Use GetByEncryptedKey( string encryptedKey, bool followMerges, int? pageId ) instead
		- `public method Rock.Model.TagService.Get(int entityTypeId, string entityQualifierColumn, string entityQualifierValue, int? ownerId)`
		- Use one of the other Gets
		- `public method Rock.Model.Workflow.Activate(WorkflowType workflowType, string name)`
		- For improved performance, use the Activate method that takes a WorkflowTypeCache parameter instead. IMPORTANT NOTE: When using the new method, the Workflow object that is returned by that method will not have the WorkflowType property set. If you are referencing the WorkflowType property on a Workflow returned by that method, you will get a Null Reference Exception! You should use the new WorkflowTypeCache property on the workflow instead.
		- `public method Rock.Model.WorkflowActivity.Activate(WorkflowActivityType activityType, Workflow workflow)`
		- For improved performance, use the Activate method that takes a WorkflowActivityTypeCache parameter instead. IMPORTANT NOTE: When using the new method, the WorkflowActivity object that is returned by that method will not have the ActitivtyType property set. If you are referencing the ActivityType property on a Workflow Activity returned by that method, you will get a Null Reference Exception! You should use the new ActivityTypeCache property on the workflow activity instead.
		- `public method Rock.Model.WorkflowActivity.Activate(WorkflowActivityType activityType, Workflow workflow, RockContext rockContext)`
		- For improved performance, use the Activate method that takes a WorkflowActivityTypeCache parameter instead. IMPORTANT NOTE: When using the new method, the WorkflowActivity object that is returned by that method will not have the ActitivtyType property set. If you are referencing the ActivityType property on a Workflow Activity returned by that method, you will get a Null Reference Exception! You should use the new ActivityTypeCache property on the workflow activity instead.
		- `public property Rock.Transactions.SaveCommunicationTransaction.TextMessage`
		- Text Message property is no longer supported for emails
		- `public method Rock.Utility.SparkLinkHelper.SendToSpark()`
		- Use SendToSpark(rockContext) to avoid error about multiple database contexts
		- `public property Rock.Web.Cache.EntityTypeCache.IsAnalyticHistoricalSupported`
		- Use IsAnalyticsHistoricalSupported( string entityTypeQualifierColumn, string entityTypeQualifierValue ) instead
		- `public property Rock.Web.Cache.EntityTypeCache.IsAnalyticSupported`
		- Use IsAnalyticsSupported( string entityTypeQualifierColumn, string entityTypeQualifierValue ) instead
		- `public property Rock.Web.UI.Controls.AttributeEditor.ShowInGridVisible`
		- Use IsShowInGridVisible instead.
		- `public class Rock.Web.UI.Controls.FieldTypeList`
		- Use FieldTypePicker instead
		- `public method Rock.Web.UI.Controls.GridFilter.DisplayFilterValueArgs..ctor(string key, string name, string value)`
		- DisplayFilterValueArgs(userPreference, prefix) instead
		- `public method Rock.Web.UI.Controls.GridFilter.DisplayFilterValueArgs..ctor(UserPreference userPreference)`
		- DisplayFilterValueArgs(userPreference, prefix) instead
		- `public property Rock.Web.UI.Controls.HtmlEditor.OnChangeScript`
		- Use CallbackOnKeyupScript or CallbackOnChangeScript instead
		- `public method Rock.Web.UI.Controls.ImageUploaderEventArgs..ctor(int? binaryFileId)`
		- ImageUploaderEventArgs(binaryFileId, eventArgument) instead
		- `public class Rock.Web.UI.Controls.LiquidField`
		- Use LavaField instead
		- `public class Rock.Web.UI.Controls.LiquidFieldTemplate`
		- Use LavaFieldTemplate instead
		- `public method Rock.Workflow.ActionComponent.LoadAttributes(WorkflowAction action)`
		- Don't Use this. The ActionTypeCache will already have the attributes loaded automatically
		- `public method Rock.Communication.Transport.MailgunHttp.Send(List recipients, string from, string fromName, string subject, string body, string appRoot, string themeRoot, List attachments, bool createCommunicationHistory)`
		- Use Send( RockMessage message, out List errorMessage ) method instead
		- `public method Rock.Communication.Transport.MailgunHttp.Send(List recipients, string from, string fromName, string subject, string body, string appRoot, string themeRoot, List attachments)`
		- Use Send( RockMessage message, out List errorMessage ) method instead
		- `public method Rock.Communication.Transport.MailgunHttp.Send(List recipients, string from, string subject, string body, string appRoot, string themeRoot, List attachments)`
		- Use Send( RockMessage message, out List errorMessage ) method instead
		- `public method Rock.Communication.Transport.MailgunHttp.Send(List recipients, string from, string subject, string body, string appRoot, string themeRoot)`
		- Use Send( RockMessage message, out List errorMessage ) method instead
		- `public method Rock.Communication.Transport.MailgunHttp.Send(Dictionary mediumData, List recipients, string appRoot, string themeRoot, bool createCommunicationHistory, Dictionary metaData)`
		- Use Send( RockMessage message, out List errorMessage ) method instead
		- `public method Rock.Communication.Transport.MailgunHttp.Send(Dictionary mediumData, List recipients, string appRoot, string themeRoot, bool createCommunicationHistory)`
		- Use Send( RockMessage message, out List errorMessage ) method instead
		- `public method Rock.Communication.Transport.MailgunHttp.Send(SystemEmail template, List recipients, string appRoot, string themeRoot, bool createCommunicationHistory)`
		- Use Send( RockMessage message, out List errorMessage ) method instead
		- `public method Rock.Communication.Transport.MailgunHttp.Send(SystemEmail template, List recipients, string appRoot, string themeRoot)`
		- Use Send( RockMessage message, out List errorMessage ) method instead
		- `public method Rock.Communication.Transport.MailgunHttp.Send(Communication communication)`
		- Use Send( Communication communication, Dictionary mediumAttributes ) instead
		- `public method Rock.Communication.Transport.MailgunHttp.Send(Dictionary mediumData, List recipients, string appRoot, string themeRoot)`
		- Use Send( RockMessage message, out List errorMessage ) method instead
		- `public method Rock.Rest.Controllers.PeopleController.GetImpersonationParameterObsolete(int personId)`
		- Returns incorrect results, will be removed in a future version
		- `public enum Rock.Model.CommunicationType`
		- Removed the "Other" option (Value 4).

### 1.11.0.2 October 15, 2019

- Restructured the DataFilters to use the generic class `Rock.Reporting.DataFilter.RelatedDataViewFilterBase<TTargetEntity, TRelatedEntity>` as a parent class. This allows Rock to remove redundant code.
	Removed the following properties and methods:
	- `public property AppliesToEntityType`
		- `public property Section`
		- `public method CreateChildControls`
		- `public method FormatSelection`
		- `public method GetClientFormatSelection`
		- `public method GetSelection`
		- `public method GetTitle`
		- `public method SetSelection`
		- `public method RenderControls`
	From the following classes:
	- `Rock.Reporting.DataFilter.BenevolenceRequest.BenevolenceResultDataViewFilter`
		- `Rock.Reporting.DataFilter.BenevolenceResult.BenevolenceRequestDataViewFilter`
		- `Rock.Reporting.DataFilter.Group.GroupTypeDataViewFilter`
		- `Rock.Reporting.DataFilter.GroupMembers.ContainsPeopleFilter` (This class still overrides the Section property)
		- `Rock.Reporting.DataFilter.Person.AttendanceDataViewFilter`
		- `Rock.Reporting.DataFilter.Person.BenevolenceRequestDataViewFilter`
		- `Rock.Reporting.DataFilter.Person.ConnectionRequestDataViewFilter`
		- `Rock.Reporting.DataFilter.Person.FinancialPledgeDataViewFilter`
		- `Rock.Reporting.DataFilter.Person.FinancialScheduledTransactionDataViewFilter`
		- `Rock.Reporting.DataFilter.Person.FinancialTransactionDataViewFilter`
		- `Rock.Reporting.DataFilter.Person.HistoryDataViewFilter`
		- `Rock.Reporting.DataFilter.Person.InteractionDataViewFilter`
		- `Rock.Reporting.DataFilter.Person.PersonalDeviceDataViewFilter`
		- `Rock.Reporting.DataFilter.Person.PrayerRequestDataViewFilter`
		- `Rock.Reporting.DataFilter.Person.StepDataViewFilter`
		- `Rock.Reporting.DataFilter.Person.UserLoginDataViewFilter`
		- `Rock.Reporting.DataFilter.PrayerRequest.ContainsPeopleFilter`
	Deleted class `Rock.Reporting.DataFilter.Group.RelatedDataViewFilterBase<TTargetEntity, TRelatedEntity>` as redundant of `Rock.Reporting.DataFilter.RelatedDataViewFilterBase<TTargetEntity, TRelatedEntity>`.
	Removed the ICacheable interface from public class Rock.Web.Cache.ModelCache<T, TT\> as it interfered with some plugins.

## Rock 10.2 Released March 27, 2020

---

In v10.2...
- The `SystemEmail` entity (model and table) is being marked obsolete. All existing data will be copied into the new `SystemCommunication` entity (retaining the same GUIDs). If you have a block that uses the SystemEmail entity, please swap it with SystemCommunication.

## Rock 10.0 Released December 16, 2019

---

- **`Rock.SystemGuid.Block`** has been changed to a static class.
- Added SameSite Cookie setting to global attributes. Default setting is Lax for better cookie handling.
- Updated to FontAwesome 5.11.1

### 1.10.0.7 September 17, 2019

- The class `public class Rock.SystemGuid.Block` was changed to be a static class.

### 1.10.0.5 August 20, 2019

- Changed property `public property Rock.Model.FeeInfo.RegistrationTemplateFeeItemId` from int to nullable int
	Renamed `public property Rock.Model.Site.ConfigurationMobilePhoneFileId` to `Rock.Model.Site.ConfigurationMobilePhoneBinaryFileId`
	Renamed `public property Rock.Model.Site.ConfigurationMobileTabletFileId` to `Rock.Model.Site.ConfigurationMobileTabletBinaryFileId`
	Renamed `public property Rock.Model.Site.ThumbnailFileId` to `Rock.Model.Site.ThumbnailBinaryFileId`
	Renamed `public property Rock.Web.Cache.SiteCache.ConfigurationMobilePhoneFileId` to `Rock.Web.Cache.SiteCache.ConfigurationMobilePhoneBinaryFileId`
	Renamed `public property Rock.Web.Cache.SiteCache.ConfigurationMobileTabletFileId` to `Rock.Web.Cache.SiteCache.ConfigurationMobileTabletBinaryFileId`
	Renamed `public property Rock.Web.Cache.SiteCache.ThumbnailFileId` to `Rock.Web.Cache.SiteCache.ThumbnailBinaryFileId`
	Moved public class `Rock.PersonProfile.AlertNote.AlertNote` to ` Rock.Badge.Component.AlertNote` to support badges for entities other than Person.
	The following classes have been moved from namespace `Rock.PersonProfile.Badge` to `Rock.Badge.Component` to support badges for entities other than Person
	- Assessment
		- AttendingDuration
		- Campus
		- DISC
		- FamilyAttendance
		- FamilyWeeksAttendedInDuration
		- GeofencedByGroup
		- Giving
		- GroupTypeAttendance
		- InDataView
		- InGroupOfType
		- InGroupWithPurpose
		- InteractionsInRange
		- LastVisitOnSite
		- Liquid
		- PersonalDevice
		- StreakEngagement
		- TopPersonSignal

### 1.10.0.3 July 24, 2019

- The PersonBadge object has been removed in favor of the Badge object which can be used for all entities. To accommodate this change the following breaking changes have been introduced: Removed: public class Rock.Attribute.PersonBadgesFieldAttribute public property Rock.Data.RockContext.PersonBadges public class Rock.Field.Types.PersonBadgesFieldType public class Rock.Model.PersonBadge public class Rock.Model.PersonBadgeConfiguration public class Rock.Model.PersonBadgeExtensionMethods public class Rock.Model.PersonBadgeService public field Rock.SystemGuid.Page.PERSON\_PROFILE\_BADGE\_DETAIL public field Rock.SystemGuid.Page.PERSON\_PROFILE\_BADGES public property Rock.Web.Cache.PersonBadgeCache.BadgeComponent public method Rock.Web.Cache.PersonBadgeCache.SetFromEntity public method Rock.Web.Cache.PersonBadgeCache.ToString public class Rock.Rest.Controllers.PersonBadgesController Signatures changed: public method Rock.PersonProfile.BadgeComponent.LoadAttributes Old: public void LoadAttributes(PersonBadge badge) New: public void LoadAttributes(Badge badge) public property Rock.PersonProfile.BadgeComponent.ParentPersonBlock Removed the setter and added Obsolete attributes. public method Rock.PersonProfile.BadgeComponent.Render The override using PersonBadgeCache changed fom abstract to virtual and added obsolete attributes. There is no code in the method. public method Rock.PersonProfile.HighlightLabelBadge.Render Old: public override void Render(PersonBadgeCache badge, HtmlTextWriter writer) New: public override void Render(BadgeCache badge, HtmlTextWriter writer) public method Rock.PersonProfile.IconBadge.GetIconPath The override using Person changed from abstract to virtual and added obsolete attributes. The method just returns an empty string. public method Rock.PersonProfile.IconBadge.GetToolTipText The override using Person has been changed from abstract to virtual and added obsolete attributes. The method just returns an empty string. public method Rock.PersonProfile.Badge.Campus.GetLabel Old: public override HighlightLabel GetLabel(Person person) New: public override HighlightLabel GetLabel(IEntity entity) public method Rock.Web.Cache.PersonBadgeCache..ctor Old: public .ctor() New: public .ctor(BadgeCache badgeCache) public method Rock.Web.UI.ContextAwareAttribute..ctor Old: public .ctor(Type entityType) New: public .ctor(Type\[\] entityTypes) public class Rock.Web.UI.PersonBlock Old: \[ContextAwareAttribute(Rock.Model.Person)\] public class PersonBlock : RockBlock, IComponent, IDisposable, IParserAccessor, IUrlResolutionService, IDataBindingsAccessor, IControlBuilderAccessor, IControlDesignerAccessor, IExpressionsAccessor, INamingContainer, IFilterResolutionService, IAttributeAccessor, INonBindingContainer, IUserControlDesignerAccessor New: \[ContextAwareAttribute(System.Collections.ObjectModel.ReadOnlyCollection\`1\[System.Reflection.CustomAttributeTypedArgument\])\] public abstract class PersonBlock : ContextEntityBlock, IComponent, IDisposable, IParserAccessor, IUrlResolutionService, IDataBindingsAccessor, IControlBuilderAccessor, IControlDesignerAccessor, IExpressionsAccessor, INamingContainer, IFilterResolutionService, IAttributeAccessor, INonBindingContainer, IUserControlDesignerAccessor public method Rock.Web.UI.PersonBlock..ctor Old: public .ctor() New: protected .ctor() public property Rock.Web.UI.Controls.PersonProfileBadge.PersonBadge Changed type from PersonBadgeCache to BadgeCache public property Rock.Web.UI.Controls.PersonProfileBadgeList.PersonBadges Changed type from List to List The Render() method has been changed from public override void Render(PersonBadgeCache badge, HtmlTextWriter writer) to public override void Render(BadgeCache badge, HtmlTextWriter writer) in the following classes: public method Rock.PersonProfile.IconBadge public method Rock.PersonProfile.AlertNote.AlertNote public method Rock.PersonProfile.Badge.AttendingDuration public method Rock.PersonProfile.Badge.DISC public method Rock.PersonProfile.Badge.FamilyAttendance public method Rock.PersonProfile.Badge.FamilyWeeksAttendedInDuration public method Rock.PersonProfile.Badge.GeofencedByGroup public method Rock.PersonProfile.Badge.Giving public method Rock.PersonProfile.Badge.GroupTypeAttendance public method Rock.PersonProfile.Badge.InDataView public method Rock.PersonProfile.Badge.InGroupOfType public method Rock.PersonProfile.Badge.InGroupWithPurpose public method Rock.PersonProfile.Badge.InteractionsInRange public method Rock.PersonProfile.Badge.LastVisitOnSite public method Rock.PersonProfile.Badge.Liquid public method Rock.PersonProfile.Badge.PersonalDevice public method Rock.PersonProfile.Badge.TopPersonSignal

### 1.10.0.1 June 20, 2019

- The following are breaking changes between v9 pre-alpha versions
	1. `public property Rock.Field.FieldVisibilityRule.ComparedToAttributeGuid`
		Removed property
		2. `public method Rock.Field.FieldVisibilityRules.Evaluate`
		Change method signature
		- Old: `public bool Evaluate(Dictionary<int, AttributeValueCache> attributeValues)`
				- New: `public bool Evaluate(Dictionary<int, AttributeValueCache> attributeValues, Dictionary<RegistrationPersonFieldType, string> personFieldValues)`
		3. `public field Rock.SystemGuid.DefinedValue.MOTIVATOR_CLUSTER_INFLUENTIAL`
		Renamed to `public field Rock.SystemGuid.DefinedValue.MOTIVATOR_RELATIONAL_THEME`
		4. `public field Rock.SystemGuid.DefinedValue.MOTIVATOR_CLUSTER_INTELLECTUAL`
		Renamed to `public field Rock.SystemGuid.DefinedValue.MOTIVATOR_INTELLECTUAL_THEME`
		5. `public field Rock.SystemGuid.DefinedValue.MOTIVATOR_CLUSTER_OPERATIONAL`
		Renamed to `public field Rock.SystemGuid.DefinedValue.MOTIVATOR_POSITIONAL_THEME`
		6. `public field Rock.SystemGuid.DefinedValue.MOTIVATOR_CLUSTER_ORGANIZATIONAL`
		Renamed to `public field Rock.SystemGuid.DefinedValue.MOTIVATOR_DIRECTIONAL_THEME`
		7. `public method Rock.Utility.Scripturize.Parse`
		Changed method signature
		- Old: `public static string Parse(string text, string defaultTranslation = "NLT", LandingSite landingSite = 0, string cssClass = "")`
				- New: `public static string Parse(string text, string defaultTranslation = "NLT", LandingSite landingSite = 0, string cssClass = "", bool openInTab = False)`
		8. `public property Rock.Web.UI.Controls.FieldVisibilityRulesEditor.ComparableAttributes`
		Removed property
		9. `public property Rock.Web.UI.Controls.FieldVisibilityWrapper.AttributeId`
		Removed property
		10. `public method Rock.Web.UI.Controls.FieldVisibilityWrapper.UpdateVisibility`
		Change method signature
		- Old: `public void UpdateVisibility(Dictionary<int, AttributeValueCache> attributeValues)`
				- New: `public void UpdateVisibility(Dictionary<int, AttributeValueCache> attributeValues, Dictionary<RegistrationPersonFieldType, string> personFieldValues)`

## Rock 9.3 Released October 23, 2019

---

- We've removed the inherited permissions on the `GetImpersonationParameter` API endpoint. If you have a custom application that uses that API you may consider re-adjusting those permissions to suit your needs.

## Rock 9.0 Released August 5, 2019

---

- As of v9, any iOS device you want to run check-in on must have iOS 10 or newer. This is due to JavaScript changes that older versions of iOS cannot run.
- If you have a check-in theme that was created before Version 7, we recommend removing <meta http-equiv="X-UA-Compatible" content="IE=10" /\> from your theme to maintain compatibility for the Rock Windows Check-In App.
- This is the last release supporting the 'Legacy' option for the Lava Support Level Global Attribute. In Rock McKinley v10 anyone using 'Legacy' will be automatically converted to 'LegacyWithWarning'. Check your ExceptionLog for any remaining legacy Lava syntax and get those cleaned up before chaning to 'NoLegacy'.
- The old "RockOriginal" theme, which was the Rock theme for v7, has been deleted with this release. Any sites that were using RockOriginal have been changed to use the Rock theme.

##### Rock.Rest Project

- Some changes were made to this project for clarification and enhancement of the endpoints and parameters. For example, this:
	// From this:
	\[RouteAttribute("api/FinancialScheduledTransactions/WithPreviousTransaction")\]
	public HttpResponseMessage GetWithPreviousTransaction(int pageSize, int pageNumber)
	// To this:
	\[RouteAttribute("api/FinancialScheduledTransactions/WithPreviousTransaction")\]
	public virtual HttpResponseMessage GetWithPreviousTransaction(int skip, int top)
	// From this:
	\[RouteAttribute("api/FinancialScheduledTransactions/Process/{scheduledTransactionId}")\]
	public HttpResponseMessage ProcessPayment(int scheduledTransactionId, bool ignoreRepeatChargeProtection = False, bool ignoreScheduleAdherenceProtection = False)
	// To this:
	\[RouteAttribute("api/FinancialScheduledTransactions/Process/{scheduledTransactionId}")\]
	public virtual HttpResponseMessage ProcessPayment(int scheduledTransactionId, bool enableDuplicateChecking = True, bool enableScheduleAdherenceProtection = True)
	// From this:
	\[RouteAttribute("api/FinancialTransactions/Process")\]
	public HttpResponseMessage ProcessPayment(AutomatedPaymentArgs automatedPaymentArgs, bool ignoreRepeatChargeProtection = False, bool ignoreScheduleAdherenceProtection = False)
	// To this:
	\[RouteAttribute("api/FinancialTransactions/Process")\]
	public virtual HttpResponseMessage ProcessPayment(AutomatedPaymentArgs automatedPaymentArgs, bool enableDuplicateChecking = True, bool enableScheduleAdherenceProtection = True)
	// From this:
	\[RouteAttribute("api/Groups/GetChildren/{id}")\]
	public IQueryable GetChildren(int id, int rootGroupId = 0, bool limitToSecurityRoleGroups = False, string includedGroupTypeIds = "", string excludedGroupTypeIds = "", bool includeInactiveGroups = False, GetCountsType countsType = 0, int campusId = 0, bool includeNoCampus = False, bool limitToPublic = False)
	// To this:
	\[RouteAttribute("api/Groups/GetChildren/{id}")\]
	public IQueryable GetChildren(int id, int rootGroupId = 0, bool limitToSecurityRoleGroups = False, string includedGroupTypeIds = "", string excludedGroupTypeIds = "", bool includeInactiveGroups = False, GetCountsType countsType = 0, int campusId = 0, bool includeNoCampus = False, bool limitToPublic = False, bool limitToSchedulingEnabled = False)

### 1.9.0.20 June 5, 2019

- The following are breaking changes between v9 and v8
	1. `public property Rock.Model.RegistrationInstance.MaxAttendees`
		Changed the property from int to nullable int
		2. `public property Rock.Model.RegistrationTemplate.MaxRegistrants`
		Changed the property from int to nullable int
		3. `public property Rock.Web.UI.Controls.RegistrationInstanceEditor.MaxAttendees`
		Changed the property from into to nullable int to match the RegistrationInstance model
	The following are breaking changes between pre-alpha v9 versions but not v8
	1. `public method Rock.Financial.IHostedGatewayComponent.CreateCustomerAccount`
		Removed `string paymentToken` from the method signature
		- Old: `public string CreateCustomerAccount(FinancialGateway financialGateway, string paymentToken, PaymentInfo paymentInfo, out String& errorMessage)`
				- New: `public string CreateCustomerAccount(FinancialGateway financialGateway, ReferencePaymentInfo paymentInfo, out String& errorMessage)`
		2. `public method Rock.Financial.IHostedGatewayComponent.GetHostedPaymentInfoToken`
		Removed method
		3. `public event Rock.Financial.IHostedGatewayPaymentControlTokenEvent.TokenReceived`
		Added event arg "HostedGatewayPaymentControlTokenEventArgs" to the TokenReceived Event
		4. `public class Rock.Model.AttendanceLabelDataConfiguration`
		This class was never used and has been removed.
		5. `public method Rock.Model.AttendanceOccurrenceService.AttendanceOccurrenceGroupLocationScheduleConfigJoinQuery`
		Changed method signature to accept a list of DateTime instead of a single one.
		- Old: `public IQueryable<AttendanceOccurrenceGroupLocationScheduleConfigJoinResult> AttendanceOccurrenceGroupLocationScheduleConfigJoinQuery(DateTime occurrenceDate, int scheduleId, List<int> groupLocationIds)`
				- New: `public IQueryable<AttendanceOccurrenceGroupLocationScheduleConfigJoinResult> AttendanceOccurrenceGroupLocationScheduleConfigJoinQuery(List<DateTime> occurrenceDateList, int scheduleId, List<int> groupLocationIds)`
		6. `public method Rock.Model.AttendanceOccurrenceService.CreateMissingAttendanceOccurrences`
		Changed method signature to accept a list of DateTime instead of a single one.
		- Old: `public List<AttendanceOccurrence> CreateMissingAttendanceOccurrences(DateTime occurrenceDate, int scheduleId, List<int> groupLocationIds)`
				- New: `public List<AttendanceOccurrence> CreateMissingAttendanceOccurrences(List<DateTime> occurrenceDateList, int scheduleId, List<int> groupLocationIds)`
		7. `public enum Rock.Model.AttendanceRecordRequiredForCheckIn`
		Clarified Enum names to better reflect their function
		- Old:
			- AllShow = 0
						- RequireAttendanceRecord = 1
						- UseAttendanceRecordAsPreference = 2
				- New:
			- ScheduleNotRequired = 0
						- PreSelect = 1
						- ScheduleRequired = 2
		8. `public method Rock.Model.AttendanceService.SendScheduleConfirmationSystemEmails`
		Added out parameter for error messages
		- Old: `public int SendScheduleConfirmationSystemEmails(IQueryable<Attendance> sendConfirmationAttendancesQuery)`
				- New: `public int SendScheduleConfirmationSystemEmails(IQueryable<Attendance> sendConfirmationAttendancesQuery, out List<string> errorMessages)`
		9. `public property Rock.Model.SchedulerResource.HasBlackoutConflict`
		Removed setter and added logic to the getter to return true if the number of blackout dates are equat or greater than the number of occurrences for the week.
		10. `public property Rock.Model.SchedulerResourceAttend.ConfirmationStatus`
		Removed Property
		11. `public field Rock.SystemGuid.SystemEmail.SCHEDULING_UPDATE`
		Renamed to `SCHEDULING_CONFIRMATION`

### 1.9.0.14 February 19, 2019

- No breaking changes in this release

### 1.9.0.13 February 5, 2019

- The following class inheritance was changed `Rock.NMI.Gateway`:
	This class is now using an IThreeStepGatewayComponent interface instead of an abstract class.

### 1.9.0.10 December 11, 2018

- Removed setter from `public property Rock.Model.TemplateFeeReport.RegistrantName`. This is now a calculated value using the property RegistrantPerson.FullName
	Removed setter from `public property Rock.Model.TemplateFeeReport.FeeTotal`. This is now a calculated value using Quantity \* Cost.

### 1.9.0.8 November 13, 2018

- `public class Rock.Rest.Controllers.AssetStorageProviderController` was renamed to `public class Rock.Rest.Controllers.AssetStorageProvidersController`.

### 1.9.0.7 October 30, 2018

- Class `public class Rock.Model.SpiritualGiftsService.SpiritalGift` renamed to `public class Rock.Model.SpiritualGiftsService.SpiritualGift`

### 1.9.0.6 October 16, 2018

- No breaking changes.

### 1.9.0.5 October 2, 2018

- Renamed `public class Rock.Security.ExternalAuthentication.Google.accesstokenresponse` to public class Rock.Security.ExternalAuthentication.Google.AccessTokenResponse. This is a POCO only used for the google security class to serialize to JSON. Probably should be private.
	The following properties, method, and classes were removed because they have been obsolete for more than two versions.
	- `public method Rock.Address.VerificationComponent.VerifyLocation` Use Verify method instead.
		- `public property Rock.Chart.IChartData.SeriesId` Use MetricValuePartitionEntityIds if you are populating this with a EntityTypeId|EntityId list, or use SeriesName for a static series name.
		- `public property Rock.Chart.SummaryData.SeriesId` Use MetricValuePartitionEntityIds if you are populating this with a EntityTypeId|EntityId list, or use SeriesName for a static series name.
		- `public property Rock.CheckIn.CheckinType.SecurityCodeLength` Use SecurityCodeAlphaNumericLength instead.
		- `public property Rock.Financial.ACHPaymentInfo.BankName` BankName is not needed.
		- `public class Rock.Trnsactions.SendPaymentReciepts` Use SendPaymentReceipts instead.
		- `public method Rock.Web.Cache.GlobalAttributesCache.GetMergeFields` Use Rock.Lava.LavaHelper.GetCommonMergeFields instead.
		- `public property Rock.Web.UI.Controls.BadgeField.ImportantMax` Use DangerMax instead.
		- `public property Rock.Web.UI.Controls.BadgeField.ImportantMin` Use DangerMin instead.
		- `public property Rock.Web.UI.Controls.FlotChart.EntityId` Use MetricValuePartitionEntityIds instead.
		- `public property Rock.Web.UI.Controls.FlotChart.SeriesNameUrl`
		- `public class Rock.Migrations.HotFixMigrations.AddAttendanceIndex` Hotfix plugin migration is no longer needed.
		- `public class Rock.Migrations.HotFixMigrations.FixAttendanceEmail` Hotfix plugin migration is no longer needed.
		- `public class Rock.Migrations.HotFixMigrations.FixBaptismBadge` Hotfix plugin migration is no longer needed.
		- `public class Rock.Migrations.HotFixMigrations.FixLabelMergeFields` Hotfix plugin migration is no longer needed.
		- `public class Rock.Migrations.HotFixMigrations.StatementProcs` Hotfix plugin migration is no longer needed.
		- `public class Rock.Migrations.HotFixMigrations.ValueAsNumeric` Hotfix plugin migration is no longer needed.
		- `public property Rock.Rest.Controllers.ExceptionLogsController.ExceptionChartData.SeriesId` Use MetricValuePartitionEntityIds if you are populating this with a EntityTypeId|EntityId list, or use SeriesName for a static series name.
		- `public method Rock.Rest.Controllers.GroupsController.GetByLocation` Use one of the other /api/Groups/ByLocation endpoint(s) instead.
		- `public method Rock.Rest.Controllers.MetricValuesController.GetSeriesName` Use api/MetricValues/GetSeriesPartitionName/{metricId}/{metricValuePartitionEntityIds} instead.
		- `public method Rock.Rest.Controllers.MetricValuesController.GetSeriesPartitionName` Use POST ~api/MetricValues/GetSeriesPartitionName/{metricId} with List of EntityTypeId|EntityId as the body.

### 1.9.0.4 September 25, 2018

- The following methods are only used internally and there should be no impact
	- `public method Rock.Jobs.PostV80DataMigrations.CreateIndexInteractionsForeignKey` changed from static to instance
		- `public method Rock.Jobs.PostV80DataMigrations.UpdateInteractionSummaryForPageViews` changed from public static to private instance
		- `public method Rock.Jobs.PostV80DataMigrations.UpdateSlugForContentChannelItems` changed from public static to private instance
	Refactor of Asset Manager classes(breaking for 9.0):
	- `public class Rock.Model.AssetStorageSystem` removed and replaced with public class Rock.Model.AssetStorageProvider
		- `public class Rock.Model.AssetStorageSystemExtensionMethods` removed and replaced with public class Rock.Model.AssetStorageProviderExtensionMethods
		- `public class Rock.Model.AssetStorageSystemService` removed and replaced with public class Rock.Model.AssetStorageProviderService
		- `public class Rock.Storage.AssetStorage.AmazonS3Component` changed all methods to use AssetStorageProvider\* instead of AssetStorageSystem\*
		- `public property Rock.Storage.AssetStorage.Asset.AssetStorageSystemId` removed and replaced with AssetStorageProviderId
		- `public class Rock.Storage.AssetStorage.FileSystemComponent` changed all methods to use AssetStorageProvider\* instead of AssetStorageSystem\*
		- `public class Rock.Rest.Controllers.AssetStorageSystemsController` removed and replaced with AssetStorageProviderController

### 1.9.0.3 September 12, 2018

- The following methods where removed for 8.\* functionality. No breaking chagnes for released functionality.
	- **`public method Rock.Utility.Ncoa.SentNotification`**
		- **`Removed public method Rock.Migrations.Checkr_CreatePages.MakePMMDefaultWorkflowAction`**

### 1.9.0.2 August 30, 2018

- The following Properties where changed from static readonly strings to support Checkr requirements:
	- **`public field Rock.Checkr.Constants.CheckrConstants.CHECKR_APISERVER`**
		- **`public field Rock.Checkr.Constants.CheckrConstants.CHECKR_CANDIDATES_URL`**
		- **`public field Rock.Checkr.Constants.CheckrConstants.CHECKR_DOCUMENT_URL`**
		- **`public field Rock.Checkr.Constants.CheckrConstants.CHECKR_INVITATIONS_URL`**
		- **`public field Rock.Checkr.Constants.CheckrConstants.CHECKR_PACKAGES_URL`**
		- **`public field Rock.Checkr.Constants.CheckrConstants.CHECKR_REPORT_URL`**
		- **`public field Rock.Checkr.Constants.CheckrConstants.CHECKR_TOKEN_URL`**
		- **`public field Rock.Checkr.Constants.CheckrConstants.CHECKR_TYPENAME_PREFIX`**
		- **`public field Rock.Checkr.Constants.CheckrConstants.CHECKR_WORKFLOW_TYPE_NAME`**
		- **`public field Rock.Migrations.Checkr_CreatePages.NEW_PMM_WORKFLOW_TYPE_NAME`**
		- **`public field Rock.SystemGuid.WorkflowType.PROTECTMYMINISTRY changed from static readonly string to constant`**
	  
	Removed REST authorization controllers to prevent security issues.
	- **`public method Rock.Rest.Controllers.AuthController.FacebookLogin removed`**
		- **`public method Rock.Rest.Controllers.AuthController.GoogleLogin removed`**
		- **`public method Rock.Rest.Controllers.AuthController.TwitterLogin removed`**
		- **`public class Rock.Security.Authentication.Auth0.Rest.Controllers.Auth0Controller removed REST functionality`**

### 1.9.0.1 August 6, 2018

- No new breaking changes between 7.4 and 9.0.1.

### 1.9.0.0 July 23, 2018

- Breaking changes between v7.4 & v8.0.22  
	- public property **`Rock.Model.Group.AddUserAccountsDuringSync`** Removed. Group Syncs are done by group and role now so this can no longer be on the group model. Use **`Rock.Model.GroupSync.AddUserAccountsDuringSync`** instead.
		- public property **`Rock.Model.Group.ExitSystemEmail`** Removed. Group Syncs are done by group and role now so this can no longer be on the group model. Use `Rock.Model.GroupSync.ExitSystemEmail` instead.
		- public property **`Rock.Model.Group.ExitSystemEmailId`** Removed. Group Syncs are done by group and role now so this can no longer be on the group model. Use **`Rock.Model.GroupSync.ExitSystemEmailId`** instead.
		- public property **`Rock.Model.Group.SyncDataView`** Removed. Group Syncs are done by group and role now so this can no longer be on the group model. Use **`Rock.Model.GroupSync.SyncDataView`** instead.
		- public property **`Rock.Model.Group.SyncDataViewId`** Removed. Group Syncs are done by group and role now so this can no longer be on the group model. Use **`Rock.Model.Group.SyncDataViewId`** instead.
		- public property **`Rock.Model.Group.WelcomeSystemEmail`** Removed. Group Syncs are done by group and role now so this can no longer be on the group model. Use **`Rock.Model.Group.WelcomeSystemEmail`** instead.
		- public property **`Rock.Model.Group.WelcomeSystemEmailId`** Removed. Group Syncs are done by group and role now so this can no longer be on the group model. Use **`Rock.Model.Group.WelcomeSystemEmailId`** instead.
		- public class **`Rock.Web.UI.ReactBlock`** Experimental block removed.
	  
	  
	This list contains the setters on cache objects that were pubic and are now private. The setters on these should not be used as the cache is just temporary storage for quick access that is maintained by the Core cache engine. Properties need to be set on the model and saved to the database. Properties should be read from the cache.  
	- public property **`Rock.Web.Cache.AttributeCache.CategoryIds`** Made Setter private
		- public property **`Rock.Web.Cache.AttributeCache.IsAnalytic`** Made Setter private
		- public property **`Rock.Web.Cache.BlockCache.BlockTypeId`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.BlockCache.CssClass`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.BlockCache.IsSystem`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.BlockCache.LayoutId`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.BlockCache.Name`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.BlockCache.Order`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.BlockCache.OutputCacheDuration`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.BlockCache.PageId`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.BlockCache.PostHtml`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.BlockCache.PreHtml`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.BlockCache.SiteId`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.BlockCache.Zone`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.BlockTypeCache.CheckedSecurityActions`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.BlockTypeCache.Description`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.BlockTypeCache.IsInstancePropertiesVerified`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.BlockTypeCache.IsSystem`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.BlockTypeCache.Name`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.BlockTypeCache.Path`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.BlockTypeCache.SecurityActions`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.CampusCache.CampusLocation.City`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.CampusCache.CampusLocation.Country`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.CampusCache.CampusLocation.ImageUrl`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.CampusCache.CampusLocation.Latitude`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.CampusCache.CampusLocation.Longitude`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.CampusCache.CampusLocation.PostalCode`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.CampusCache.CampusLocation.State`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.CampusCache.CampusLocation.Street1`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.CampusCache.CampusLocation.Street2`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.CampusCache.Description`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.CampusCache.IsActive`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.CampusCache.IsSystem`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.CampusCache.LeaderPersonAliasId`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.CampusCache.Location`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.CampusCache.LocationId`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.CampusCache.Name`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.CampusCache.PhoneNumber`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.CampusCache.RawServiceTimes`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.CampusCache.ServiceTime.Time`** Made DataMember, setter is internal
		- public property **`Rock.Web.Cache.CampusCache.ShortCode`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.CampusCache.TimeZoneId`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.CampusCache.Url`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.ContentChannelCache.ChannelUrl`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.ContentChannelCache.ChildItemsManuallyOrdered`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.ContentChannelCache.ContentChannelTypeId`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.ContentChannelCache.ContentControlType`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.ContentChannelCache.Description`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.ContentChannelCache.EnableRss`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.ContentChannelCache.IconCssClass`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.ContentChannelCache.IsIndexEnabled`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.ContentChannelCache.ItemsManuallyOrdered`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.ContentChannelCache.ItemUrl`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.ContentChannelCache.Name`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.ContentChannelCache.RequiresApproval`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.ContentChannelCache.RootImageDirectory`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.DefinedTypeCache.CategoryId`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.DefinedTypeCache.Description`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.DefinedTypeCache.FieldTypeId`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.DefinedTypeCache.IsSystem`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.DefinedTypeCache.Name`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.DefinedTypeCache.Order`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.DefinedValueCache.DefinedType`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.EntityTypeCache.AssemblyName`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.EntityTypeCache.FriendlyName`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.EntityTypeCache.IndexDocumentUrl`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.EntityTypeCache.IndexResultTemplate`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.EntityTypeCache.IsAnalyticHistoricalSupported`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.EntityTypeCache.IsAnalyticSupported`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.EntityTypeCache.IsEntity`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.EntityTypeCache.IsIndexingEnabled`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.EntityTypeCache.IsIndexingSupported`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.EntityTypeCache.IsSecured`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.EntityTypeCache.LinkUrlLavaTemplate`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.EntityTypeCache.Name`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.EventCalendarCache.Description`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.EventCalendarCache.IconCssClass`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.EventCalendarCache.IsActive`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.EventCalendarCache.IsSystem`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.EventCalendarCache.Name`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.GroupTypeCache.GroupScheduleExclusions`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.GroupTypeCache.Roles`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.GroupTypeRoleCache.CanEdit`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.GroupTypeRoleCache.CanView`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.GroupTypeRoleCache.Guid`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.GroupTypeRoleCache.Id`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.GroupTypeRoleCache.IsLeader`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.GroupTypeRoleCache.MaxCount`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.GroupTypeRoleCache.MinCount`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.GroupTypeRoleCache.Name`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.GroupTypeRoleCache.Order`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.InteractionChannelCache.ChannelEntityId`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.InteractionChannelCache.ChannelTypeMediumValueId`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.InteractionChannelCache.ComponentCacheDuration`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.InteractionChannelCache.ComponentEntityTypeId`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.InteractionChannelCache.InteractionEntityTypeId`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.InteractionChannelCache.Name`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.InteractionChannelCache.RetentionDuration`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.InteractionComponentCache.ChannelId`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.InteractionComponentCache.EntityId`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.InteractionComponentCache.Name`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.LavaShortcodeCache.Description`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.LavaShortcodeCache.Documentation`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.LavaShortcodeCache.EnabledLavaCommands`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.LavaShortcodeCache.IsActive`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.LavaShortcodeCache.IsSystem`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.LavaShortcodeCache.Markup`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.LavaShortcodeCache.Name`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.LavaShortcodeCache.Parameters`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.LavaShortcodeCache.TagName`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.LavaShortcodeCache.TagType`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.LayoutCache.Description`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.LayoutCache.FileName`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.LayoutCache.IsSystem`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.LayoutCache.Name`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.LayoutCache.SiteId`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.NoteTypeCache.CssClass`** Marked obsolete, setter is private
		- public property **`Rock.Web.Cache.PageCache.AllowIndexing`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.PageCache.BodyCssClass`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.PageCache.BreadCrumbDisplayIcon`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.PageCache.BreadCrumbDisplayName`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.PageCache.BrowserTitle`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.PageCache.Description`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.PageCache.DisplayInNavWhen`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.PageCache.EnableViewState`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.PageCache.HeaderContent`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.PageCache.IconCssClass`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.PageCache.IconFileId`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.PageCache.IncludeAdminFooter`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.PageCache.InternalName`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.PageCache.IsSystem`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.PageCache.KeyWords`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.PageCache.LayoutId`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.PageCache.MenuDisplayChildPages`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.PageCache.MenuDisplayDescription`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.PageCache.MenuDisplayIcon`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.PageCache.Order`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.PageCache.OutputCacheDuration`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.PageCache.PageContexts`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.PageCache.PageDisplayBreadCrumb`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.PageCache.PageDisplayDescription`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.PageCache.PageDisplayIcon`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.PageCache.PageDisplayTitle`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.PageCache.PageRouteInfo.Guid`** Made DataMember, setter is internal
		- public property **`Rock.Web.Cache.PageCache.PageRouteInfo.Id`** Made DataMember, setter is internal
		- public property **`Rock.Web.Cache.PageCache.PageRouteInfo.Route`** Made DataMember, setter is internal
		- public property **`Rock.Web.Cache.PageCache.PageRoutes`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.PageCache.PageTitle`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.PageCache.ParentPageId`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.PageCache.RequiresEncryption`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.RestControllerCache.ClassName`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.RestControllerCache.Name`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.SiteCache.AllowedFrameDomains`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.SiteCache.AllowIndexing`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.SiteCache.ChangePasswordPageId`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.SiteCache.ChangePasswordPageRouteId`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.SiteCache.CommunicationPageId`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.SiteCache.CommunicationPageRouteId`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.SiteCache.DefaultPageId`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.SiteCache.DefaultPageRouteId`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.SiteCache.Description`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.SiteCache.EnabledForShortening`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.SiteCache.EnableMobileRedirect`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.SiteCache.EnablePageViews`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.SiteCache.ErrorPage`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.SiteCache.ExternalUrl`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.SiteCache.FavIconBinaryFileId`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.SiteCache.GoogleAnalyticsCode`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.SiteCache.IndexStartingLocation`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.SiteCache.IsIndexEnabled`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.SiteCache.IsSystem`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.SiteCache.LoginPageId`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.SiteCache.LoginPageRouteId`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.SiteCache.MobilePageId`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.SiteCache.Name`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.SiteCache.PageHeaderContent`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.SiteCache.PageNotFoundPageId`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.SiteCache.PageNotFoundPageRouteId`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.SiteCache.RedirectTablets`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.SiteCache.RegistrationPageId`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.SiteCache.RegistrationPageRouteId`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.SiteCache.RequiresEncryption`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.SiteCache.Theme`** Made setter private
		- public property **`Rock.Web.Cache.WorkflowActionFormAttributeCache.AttributeId`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.WorkflowActionFormAttributeCache.HideLabel`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.WorkflowActionFormAttributeCache.IsReadOnly`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.WorkflowActionFormAttributeCache.IsRequired`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.WorkflowActionFormAttributeCache.IsVisible`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.WorkflowActionFormAttributeCache.Order`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.WorkflowActionFormAttributeCache.PostHtml`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.WorkflowActionFormAttributeCache.PreHtml`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.WorkflowActionFormAttributeCache.WorkflowActionFormId`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.WorkflowActionFormCache.ActionAttributeGuid`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.WorkflowActionFormCache.Actions`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.WorkflowActionFormCache.AllowNotes`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.WorkflowActionFormCache.Footer`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.WorkflowActionFormCache.Header`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.WorkflowActionFormCache.IncludeActionsInNotification`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.WorkflowActionFormCache.NotificationSystemEmailId`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.WorkflowActionTypeCache.ActivityTypeId`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.WorkflowActionTypeCache.CriteriaAttributeGuid`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.WorkflowActionTypeCache.CriteriaComparisonType`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.WorkflowActionTypeCache.CriteriaValue`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.WorkflowActionTypeCache.EntityTypeId`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.WorkflowActionTypeCache.IsActionCompletedOnSuccess`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.WorkflowActionTypeCache.IsActivityCompletedOnSuccess`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.WorkflowActionTypeCache.Name`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.WorkflowActionTypeCache.Order`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.WorkflowActionTypeCache.WorkflowFormId`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.WorkflowActivityTypeCache.Description`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.WorkflowActivityTypeCache.IsActivatedWithWorkflow`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.WorkflowActivityTypeCache.IsActive`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.WorkflowActivityTypeCache.Name`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.WorkflowActivityTypeCache.Order`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.WorkflowActivityTypeCache.WorkflowTypeId`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.WorkflowTypeCache.CategoryId`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.WorkflowTypeCache.CompletedWorkflowRetentionPeriod`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.WorkflowTypeCache.Description`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.WorkflowTypeCache.IconCssClass`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.WorkflowTypeCache.IsActive`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.WorkflowTypeCache.IsPersisted`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.WorkflowTypeCache.IsSystem`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.WorkflowTypeCache.LoggingLevel`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.WorkflowTypeCache.LogRetentionPeriod`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.WorkflowTypeCache.Name`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.WorkflowTypeCache.NoActionMessage`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.WorkflowTypeCache.Order`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.WorkflowTypeCache.ProcessingIntervalSeconds`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.WorkflowTypeCache.SummaryViewText`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.WorkflowTypeCache.WorkflowIdPrefix`** Made DataMember, setter is private
		- public property **`Rock.Web.Cache.WorkflowTypeCache.WorkTerm`** Made DataMember, setter is private

## Rock 8.7 Released March 19, 2019

---

We've updated the way the 'unsubscribe' functionality works. Be sure to look at the generic Unsubscribe HTML in the Email medium (under Admin Tools \> Communications \> Communication Mediums) and make similar changes to any custom templates you have (replacing `Unsubscribe/{%raw%}{{ Person.UrlEncodedKey }}{%endraw%}` with `Unsubscribe/{%raw%}{{ Person | PersonActionIdentifier:'Unsubscribe' }}{%endraw%}`). You will also need to update the Non-HTML Content for the Email Communication Medium (Located in Communications \> Communication Mediums; replacing {%raw%}`&p={{ Person.UrlEncodedKey }}` with `&p={{ Person | PersonActionIdentifier:'Unsubscribe' }}`{%endraw%} )

## Rock 8.0 Released September 17, 2018

---

##### Check-in

- Some changes were made to support different time zones on campuses.
- The way labels are sent to the printers when printing over the network have been changed to support extended characters.
- Minor changes were made to the Windows check-in client to provide extended character support.
- We added a new Check-in 'AttendanceOccurrence' table and moved the GroupId, LocationId, ScheduleId, SundayDate and DidNotOccur from 'Attendance' to 'AttendanceOccurrence'. As a result, any custom SQL queries you have that reference these fields will be effected. For example, this:
	SELECT ...
	FROM   \[Attendance\] AS a
	INNER JOIN \[Group\] g ON a.GroupId = g.Idwill need to change to something like:
	SELECT ...
	FROM   \[Attendance\] AS a
	INNER JOIN \[AttendanceOccurrence\] o ON o.Id = a.OccurrenceId
	INNER JOIN \[Group\] g ON a.GroupId = g.IdAlso Lava such as this: `{%raw%}{% attendance where:'GroupId == "24"' %}{%endraw%}` or this `{%raw%}{% attendance.GroupId %}{%endraw%}` will need to change to something like this: `{%raw%}{% attendanceoccurrence where:'GroupId == "24"' %}{%endraw%}` and this `{%raw%}{% attendanceoccurrence.GroupId %}{%endraw%}`

##### Caching

- Rock's caching engine was completely re-written. This cleaned up a lot of inconsistencies in the API and implemented several new features (cache tags and the new cache lava block). This level of change is sure to bring up several issues (the first caching engine took 2-3 major releases to iron out all of invalidation issues).
- Cache Tags – See documentation
- Lava Caching Block – See [https://rockrms.com/lava](https://rockrms.com/lava) Version Specific Features
- Group History – See documentation.
- Notes – Major updates here. Please check that all the places you use notes are still functioning correctly. Then start playing with some of the new features: watches and approvals.
- New Homepage Block – Start adding sample content the way you might use it in production.
- Persisted Data Views
- Signals – See documentation.
- Please verify all plugins that you have written.

##### Code Updates

Below is a list of all the code changes made in Rock 8.0 that may potentially affect custom code and/or plugins.

- **`Rock.Web.UI.Cache.*`** setters are now private on \*Cache objects *(NOTE: The cache is read only so setting a value into cache never really makes sense anyhow.)*
- property **`Rock.Model.Attendance.Group`** made obsolete and removed setter. Use Occurrence.Group instead.
- property **`Rock.Model.Attendance.IsValid`** removed.
- property **`Rock.Model.Attendance.Location`** made obsolete and removed setter. Use Occurrence.Location instead.
- property **`Rock.Model.Attendance.Schedule`** made obsolete removed setter. Use Occurrence.Schedule instead.
- property **`Rock.Model.Attendance.SundayDate`** made obsolete and removed setter. Use Occurrence.SundayDate instead.
- property **`Rock.Model.HistoryItem.Changes`** removed, use PersonHistoryChangeList and GroupMemberHistoryChangeList instead.
- property **`Rock.SystemGuid.DefinedType.PROTECT_MY_MINISTRY_PACKAGES`** changed to **`Rock.SystemGuid.DefinedType.BACKGROUND_CHECK_TYPES`** as part of adding Checkr background check support.

The following properties were removed from the `Rock.Model.Group` class:

- AddUserAccountsDuringSync
- ExitSystemEmail
- ExitSystemEmailId
- SyncDataView
- SyncDataViewId
- WelcomeSystemEmail
- WelcomeSystemEmailId

These properties were all moved to a new `Rock.Model.GroupSync` class to support role-specific group syncing.

### 1.8.0.17 June 3, 2018

- property **`Rock.Cache.CacheCategory.ScheduleExclusions`** setter is now private.
- property **`Rock.Cache.CacheSite.Theme`** setter is now private.
- property **`Rock.Cache.IEntityCache.ForeignGuid`** removed setter.
- property **`Rock.Cache.IEntityCache.ForeignId`** removed setter.
- property **`Rock.Cache.IEntityCache.ForeignKey`** removed setter.
- property **`Rock.Cache.IEntityCache.Guid`** removed setter.
- property **`Rock.Cache.IEntityCache.Id`** removed setter.
- property **`Rock.Model.Attendance.DidNotOccur`** made obsolete and removed setter. Use Occurrence.DidNotOccur instead.
- property **`Rock.Model.Attendance.Group`** made obsolete and removed setter. Use Occurrence.Group instead.
- property **`Rock.Model.Attendance.GroupId`** made obsolete and removed setter. Use Occurrence.GroupId instead.
- property **`Rock.Model.Attendance.IsValid`** removed.
- property **`Rock.Model.Attendance.Location`** made obsolete and removed setter. Use Occurrence.Location instead.
- property **`Rock.Model.Attendance.LocationId`** made obsolete and removed setter. Use Occurrence.LocationId instead.
- property **`Rock.Model.Attendance.Schedule`** made obsolete removed setter. Use Occurrence.Schedule instead.
- property **`Rock.Model.Attendance.ScheduleId`** made obsolete and removed setter. Use Occurrence.ScheduleId instead.
- property **`Rock.Model.Attendance.SundayDate`** made obsolete and removed setter. Use Occurrence.SundayDate instead.
- property **`Rock.Model.HistoryItem.Changes`** removed, use PersonHistoryChangeList and GroupMemberHistoryChangeList instead.
- property **`Rock.SystemGuid.DefinedType.PROTECT_MY_MINISTRY_PACKAGES`** changed to **`Rock.SystemGuid.DefinedType.BACKGROUND_CHECK_TYPES`** as part of adding Checkr background check support.

### 1.8.0.16 May 21, 2018

- - **`Rock.Checkin.CheckinType`**  
		The `SearchType` property returns new version of CacheDefinedValue
		- **`Rock.Checkin.KioskGroupType`**  
		The `GroupType()` property returns new version of CacheGroupType
		- **`Rock.Communication.Medium.SMS`**  
		The `FindFromPhoneDefinedValue()` method returns new version of CacheDefinedValue
		- **`Rock.Data.Model`**  
		The `GetInheritedAttributes()` method returns new version of List<CacheAttribute\>
		- **`Rock.Extension.ComponentModel`**  
		The `EntityType` property returns new version of CacheEntityType
		- **`Rock.Financial.ACHPaymentInfo`**  
		The `CurrencyTypeValue` property returns new version of CacheDefinedValue
		- **`Rock.Financial.CreditCardPaymentInfo`**  
		The `CurrencyTypeValue` property returns new version of CacheDefinedValue
		- **`Rock.Financial.CreditCardPaymentInfo`**  
		The `GetCreditCardType()` method returns new version of CacheDefinedValue
		- **`Rock.Financial.GatewayComponent`**  
		The `SupportedPaymentSchedules` property returns new version of List<CacheDefinedValue\>
		- **`Rock.Financial.SwipePaymentInfo`**  
		The `CreditCardTypeValue` property returns new version of CacheDefinedValue
		- **`Rock.Financial.SwipePaymentInfo`**  
		The `CurrencyTypeValue` property returns new version of CacheDefinedValue
		- **`Rock.Financial.TestGateway`**  
		The `SupportedPaymentSchedules` property returns new version of List<CacheDefinedValue\>
		- **`Rock.Model.EventItem`**  
		The `GetInheritedAttributes()` method returns new version of List<CacheAttribute\>
		- **`Rock.Model.Group`**  
		The `GetInheritedAttributes()` method returns new version of List<CacheAttribute\>
		- **`Rock.Model.GroupMember`**  
		The `GetInheritedAttributes()` method returns new version of List<CacheAttribute\>
		- **`Rock.Model.GroupType`**  
		The `GetInheritedAttributes()` method returns new version of List<CacheAttribute\>
		- **`Rock.Model.GroupType`**  
		The `GetInheritedAttributesForQualifier()` method returns new version of List<CacheAttribute\>
		- **`Rock.Model.Registrationregistrant`**  
		The `GetInheritedAttributes()` method returns new version of List<CacheAttribute\>
		- **`Rock.Model.WorkflowAction`**  
		The `ActionTypeCache` property returns new version of CacheWorkflowActionType
		- **`Rock.Model.WorkflowActivity`**  
		The `ActivityTypeCache` property returns new version of CacheWorkflowActivityType
		- **`Rock.NMI.Gateway`**  
		The `SupportedPaymentSchedules` property returns new version of List<CacheDefinedValue\>
		- **`Rock.PayFlowPro.Gateway`**  
		The `SupportedPaymentSchedules` property returns new version of List<CacheDefinedValue\>
		- **`Rock.Security.BackgroundCheckComponent`**  
		The abstract `SendRequest()` method expects new cache objects as parameters
		- **`Rock.Security.BackgroundCheck.ProtectMyMinistry`**  
		The abstract `SendRequest()` method expects new cache objects as parameters
		- **`Rock.Web.Cache.BackgroundCheck.ProtectMyMinistry`**  
		The abstract `SendRequest()` method expects new cache objects as parameters
		- **`Rock.Web.Cache.EventCalendarCache`**  
		The `CacheKey` property was removed
		- **`Rock.Web.UI.RockBlock`**  
		The `ContextTypesRequired` property returns new version of List<CacheEntityType\>
		- **`Rock.Web.UI.RockPage`**  
		The `GetContextEntityTypes()` method returns new version of List<CacheEntityType\>
		- **`Rock.Web.UI.Controls.AttributeEditor`**  
		The `ExcludedFieldTypes()` method returns new version of CacheFieldType array
		- **`Rock.Web.UI.Controls.AttributeEditor`**  
		The `IncludeFieldTypes()` method returns new version of CacheFieldType array
		- **`Rock.Web.UI.Controls.CheckinArea`**  
		The `GetCheckinLabelAttributes()` method returns new version of Dictionary<string, CacheAttribute\>
		- **`Rock.Web.UI.Controls.DefinedValueField`**  
		The `GetDefinedValue()` method returns new version of CacheDefinedValue
		- **`Rock.Web.UI.Controls.GradePicker`**  
		The `SelectedGradeValue()` method returns new version of CacheDefinedValue
		- **`Rock.Web.UI.Controls.NoteContainer`**  
		The `NoteTypes` property is now a list of the new NoteTypeCache class items
		- **`Rock.Web.UI.Controls.NoteControl`**  
		The `NoteTypes` property is now a list of the new NoteTypeCache class items
		- **`Rock.Workflow.Action.Checkin.CreateLabels`**  
		The `GetLabels()` method now expects items implementing new IHhasAttributes interface

### 1.8.0.8 February 5, 2018

- The following properties were removed from the `Rock.Model.Group` class:
	- AddUserAccountsDuringSync
		- ExitSystemEmail
		- ExitSystemEmailId
		- SyncDataView
		- SyncDataViewId
		- WelcomeSystemEmail
		- WelcomeSystemEmailId
	These properties were all moved to a new `Rock.Model.GroupSync` class to support role-specific group syncing.

## Rock 7.0 Released January 31, 2018

---

If you are using the **SendGrid Email Transport** update the plugin from the RockShop immediately after upgrading to Rock v7.

Page view and email activity data has been moved in Rock v7. While we make a huge effort to not break things during updates the transition of this data to new tables may break custom SQL or code that was querying this data from the PageView and/or CommunicationRecipientActivity tables. All of the data has been transitioned to their new home in the Interactions tables so you won't miss a thing. This should impact only a very small number of organizations who have written custom code or SQL against these few tables. Note that since there could be a large amount of data to convert from the old PageView and CommunicationRecipientActivity tables, a Rock Job called 'Move Data from PageViews and Communication Activity to the new Interaction Tables' will run at 4am after v7 is installed. This job could take an hour or so depending on how much data there is.

The external giving blocks have a new 'Give as Business' option which defaults to 'on'. If you don't want your giving blocks to have the 'Give as Business' option, you'll have to change that manually.

There is a new 'Expiring Credit Card Notices' job which is enabled to run at 7:30 AM on the 1st of every month. It can be disabled manually if needed.

The ZebraPhoto lava command was changed to use the R: (DRAM) location due to long term problems with repetitive writing to the E: (Flash) location. Any labels using ZebraPhoto must also change their Recall Graphic (^XG) command to use the R: location too. [https://www.rockrms.com/lava/person#zebraphoto](https://www.rockrms.com/lava/person#zebraphoto)

There is a new 'Database Maintenance' job that is enabled to run at 2:30 AM every day by default. If you SQL database already has a maintenance plan, update the 'Database Maintenance' job and/or your SQL Maintenance Plan to do what you want.

Make sure to enable the Google Static Maps API in your Google API Manager dashboard.

A change was made in how group requirement notifications are sent out. Before it would send to all Roles marked 'IsLeader' of the group, with the ability to provide a list of Role Ids to exclude. This has been changed to use the 'Receive Requirements Notifications' property on the Role. If you have setup jobs to send group requirement emails you will want to ensure that you configure the roles you want to receive these emails to have the 'Receive Requirements Notifications' checked.

Staff and Staff-Like roles will be given Edit access to the following group types if those group types do not already have specific 'Edit' roles defined. This is so that staff can add new groups of those types.

- Serving Teams
- Small Group Section
- Small Group
- General Group
- Organization Unit
  

ContentChannelView has been updated to not support legacy Lava syntax for accessing global attributes. To enable this, a new "Enable Legacy Global Attribute Lava" block setting needs to be set to true (which negatively affect performance of this block).

Group Attributes now enforce security. Edit each Group Type in General Settings \> Group Types, and make sure to set the security on each of the Group Attributes so they can be edited by the appropriate team.

iScroll.js is now included in the RockLibs.js bundle. If you have a custom blocks (i.e. check-in) that is loading iScroll.js, this is no longer needed.

This release fixes a bug where workflow activities marked as inactive were still being processed. If you have any activities where 'Is Active' is not checked they will no longer run even if you use the 'Activate Workflow Activity' action. This action activates an instance of an activity. The activity type however, must be active for this to occur.

#### Code Updates

Below is a list of all the code changes made in Rock v7 that may potentially affect custom code and/or plugins.

##### Classes Removed

- Rock.Data.Context.CommunicationRecipientActivities
- Rock.Data.Context.PageViews
- Rock.Data.Context.PageViewSessions
- Rock.Data.Context.PageViewUserAgents
- Rock.Model.CommunicationRecipientActivity
- Rock.Model.CommunicationRecipientActivityConfiguration
- Rock.Model.CommunicationRecipientActivityExtensionMethods
- Rock.Model.CommunicationRecipientActivityService
- Rock.Model.PageView
- Rock.Model.PageViewConfiguration
- Rock.Model.PageViewExtensionMethods
- Rock.Model.PageViewService
- Rock.Model.PageViewSession
- Rock.Model.PageViewSessionConfiguration
- Rock.Model.PageViewSessionExtensionMethods
- Rock.Model.PageViewSessionService
- Rock.Model.PageViewUserAgent
- Rock.Model.PageViewUserAgentConfiguration
- Rock.Model.PageViewUserAgentExtensionMethods
- Rock.Model.PageViewUserAgentService
- Rock.Rest.Controllers.CommunicationRecipientActivitiesController
- Rock.Rest.Controllers.PageViewsController
- Rock.Rest.Controllers.PageViewSessionsController
- Rock.Rest.Controllers.PageViewUserAgentsController

##### Properties Changed

- Rock.Model.GroupRequirement.GroupId *Changed from int to int? (nullable)*
- Rock.Model.PersonAlias.AliasPersonGuid *Changed from Guid to Guid? (nullable)*
- Rock.Model.PersonAlias.AliasPersonId *Changed from int to int? (nullable)*
- Rock.Model.Tag.EntityTypeId Changed *from int to int? (nullable)*

##### Properties Removed

- Rock.Model.Communication.Medium
- Rock.Model.Communication.MediumEntityType
- Rock.Model.Communication.MediumEntityTypeId
- Rock.Model.CommunicationRecipient.Activities
- Rock.Model.CommunicationTemplate.Medium
- Rock.Model.CommunicationTemplate.MediumEntityType
- Rock.Model.CommunicationTemplate.MediumEntityTypeId
- Rock.Model.ConnectionOpportunity.GroupMemberRole
- Rock.Model.ConnectionOpportunity.GroupMemberRoleId
- Rock.Model.ConnectionOpportunity.GroupMemberStatus
- Rock.Model.ConnectionOpportunity.GroupType
- Rock.Model.ConnectionOpportunity.UseAllGroupsOfType
- Rock.Model.Site.PageViewRetentionPeriodDays
- Rock.Model.SiteCache.PageViewRetentionPeriodDays
- Rock.Web.UI.Controls.BirthdayPicker.FromGroupCssClass
- Rock.Web.UI.Controls.BirthdayPicker.Help
- Rock.Web.UI.Controls.BirthdayPicker.HelpBlock
- Rock.Web.UI.Controls.BirthdayPicker.IsValid
- Rock.Web.UI.Controls.BirthdayPicker.Label
- Rock.Web.UI.Controls.BirthdayPicker.Required
- Rock.Web.UI.Controls.BirthdayPicker.RequiredErrorMessage
- Rock.Web.UI.Controls.BirthdayPicker.RequiredFieldValidator
- Rock.Web.UI.Controls.BirthdayPicker.SelectedDate
- Rock.Web.UI.Controls.BirthdayPicker.ValidationGroup
- Rock.Web.UI.Controls.BirthdayPicker.Warning
- Rock.Web.UI.Controls.BirthdayPicker.WarningBlock
- Rock.Web.UI.Controls.Grid.IsExporting
- Rock.Web.UI.Controls.LiquidField.ParentGrid
- Rock.Web.UI.Controls.LiquidFieldTemplate.DataFieldInfo
- Rock.Web.UI.Controls.RockLiteralField.ID
- Rock.Web.UI.Controls.Communication.Email.MediumData
- Rock.Web.UI.Controls.Communication.MediumControl.MediumData
- Rock.Web.UI.Controls.Communication.Sms.MediumData

##### Methods Changed

- Rock.Attribute.SiteFieldAttribute(string name = "Site", string description = "", bool required = True, string defaultSiteId = "", string category = "", int order = 0, string key, bool shorteningSitesOnly = False) *Last parameter of constructor was added*
- Rock.Lava.RockFilters.Append(object input, object string) *Second parameter was changed from string to object*
- Rock.Model.FinancialTransaction(PreSaveChanges(DbContext dbContext, DbEntityEntry entry) *Last parameter was changed from "EntityState state" to "DbEntityEntry entry"*
- Rock.Model.FinancialTransactionImage(PreSaveChanges(DbContext dbContext, DbEntityEntry entry) *Last parameter was changed from "EntityState state" to "DbEntityEntry entry"*
- Rock.Model.Report.GetQueryable(Type entityType, Dictionary entityFields, Dictionary attributes, Dictionary selectComponents, SortProperty sortProperty, int? databaseTimeoutSeconds, out List\`1& errorMessages, out DbContext& reportDbContext) *"dataViewFilterOverrides" parameter was removed, and "reportDbContext" parameter was added*
- Rock.Reporting.ReportingHelper.BindGrid.BindGrid(Report report, Grid gReport, Person currentPerson, int? databaseTimeoutSeconds, bool isCommunication, out String& errorMessage) *"dataViewFilterOverrides" parameter was removed, and "isCommunication" parameter was added*
- Rock.Reporting.DataFilter.GroupMember.GroupMemberAttributesFilter.GetSelection(Type entityType, Control\[\] controls, FilterMode filterMode) *Last "filterMode" parameter was added*
- Rock.Reporting.DataFilter.GroupMember.GroupMemberAttributesFilter.RenderControls(Type entityType, FilterField filterControl, HtmlTextWriter writer, Control\[\] controls, FilterMode filterMode) *Last "filterMode" parameter was added*
- Rock.Rest.Controllers.CategoriesController.GetChildren(int id, int rootCategoryId = 0, bool getCategorizedItems = False, int entityTypeId = 0, string entityQualifier, string entityQualifierValue, bool showUnnamedEntityItems = True, bool showCategoriesThatHaveNoChildren = True, string includedCategoryIds, string excludedCategoryIds, string defaultIconCssClass, bool includeInactiveItems = True) *Last "IncludeInactiveItems" parameter was added*
- Rock.Rest.Controllers.GroupsController.GetChildren(int id, int rootGroupId = 0, bool limitToSecurityRoleGroups = False, string includedGroupTypeIds = "", string excludedGroupTypeIds = "", bool includeInactiveGroups = False, GetCountsType countsType = 0, int campusId = 0, bool includeNoCampus = False) *Last two parameters ("campusId" and "includeNoCampus") were added*
- Rock.Rest.Controllers.LavaController.RenderTemplate(string template, string additionalMergeObjects) *Last "additionalMergeObjects" parameter was added*
- Rock.Rest.Controllers.TaggedItemsController. Delete(int entityTypeId, int ownerId, Guid entityGuid, string name, string entityQualifier, string entityQualifierValue, Nullable categoryGuid, bool? includeInactive) *Last four parameters ("entityQualifier", "entityQualifierValue", "categoryGuid", and "includeInactive") were added*
- Rock.Rest.Controllers.TaggedItemsController. Post(int entityTypeId, int ownerId, Guid entityGuid, string name, string entityQualifier, string entityQualifierValue, Nullable categoryGuid, bool? includeInactive) *Last four parameters ("entityQualifier", "entityQualifierValue", "categoryGuid", and "includeInactive") were added*

##### Methods Removed

- Rock.Communication.Medium.Email.ProcessHtmlBody(Communication communication, GlobalAttributesCache globalAttributes, Dictionary mergeObjects, Person currentPersonOverride)
- Rock.Communication.Medium.Email.ProcessTextBody(Communication communication, GlobalAttributesCache globalAttributes, Dictionary mergeObjects, Person currentPersonOverride)
- Rock.Communication.Medium.Email.Send(Communication communication)
- Rock.Communication.Medium.SMS.Send(Communication communication)
- Rock.Field.Types.MarkdownFieldType.FormatValueAsHtml(Control parentControl, string value, Dictionary configurationValues, bool condensed = False)
- Rock.Field.Types.MemoFieldType.FormatValueAsHtml(Control parentControl, string value, Dictionary configurationValues, bool condensed = False)
- Rock.Field.Types.RangeSliderFieldType.FormatValueAsHtml(Control parentControl, string value, Dictionary configurationValues, bool condensed = False)
- Rock.Web.UI.Controls.BirthdayPicker.RenderBaseControl(HtmlTextWriter writer)
- Rock.Web.UI.Controls.BirthdayPicker.RenderControl(HtmlTextWriter writer)
- Rock.Web.UI.Controls.LiquidField.Intitialize(bool sortingEnabled, Control control)
- Rock.Web.UI.Controls.LiquidFieldTemplate.InstantiateIn(Control container)
- Rock.Web.UI.Controls.MarkdownEditor.OnInit(EventArgs e)
- Rock.Web.UI.Controls.MarkdownEditor.RenderBaseControl(HtmlTextWriter writer)
- Rock.Rest.Controllers.TaggedItemsController.AddRoutes(RouteCollection routes)
- Rock.Rest.Controllers.TaggedItemsController.Delete(int entityTypeId, int ownerId, Guid entityGuid, string name, string entityQualifier)
- Rock.Rest.Controllers.TaggedItemsController.Delete(int entityTypeId, int ownerId, Guid entityGuid, string name, string entityQualifier, string entityQualifierValue)
- Rock.Rest.Controllers.TaggedItemsController.Post(int entityTypeId, int ownerId, Guid entityGuid, string name, string entityQualifier)
- Rock.Rest.Controllers.TaggedItemsController.Post(int entityTypeId, int ownerId, Guid entityGuid, string name, string entityQualifier, string entityQualifierValue)

## Rock 6.0 Released December 14, 2016

---

This release fixes a bug where workflow activities marked as inactive were still being processed. If you have any activities where 'Is Active' is not checked they will no longer run even if you use the 'Activate Workflow Activity' action. This action activates an instance of an activity. The activity type however, must be active for this to occur.

- Rock now requires Microsoft .NET Framework 4.5.2 or greater on the hosting server. This framework version was released by Microsoft on May 5th, 2014. You will need to upgrade hosting server in order to proceed with the next update.
- The Rock project now requires Visual Studio 2015 due to some C# 6.0 dependencies.

## Rock 5.0 Released July 25, 2016

---

- Rock now requires ASP.Net 4.5.2
- Check-in
	- The Rock.CheckIn.CheckInBlock now has a CurrentCheckinType/CurrentCheckinTypeId and the Rock.CheckIn.CheckInState class has a CheckinType/CheckinTypeId that is used (required) by various Workflow actions.
- Person
	- Several Rock.Model.Person.GetPhotoUrl(...) methods [were deprecated](https://github.com/SparkDevNetwork/Rock/commit/a4699d9bcef82c1599bac48400c0566d12ab603a). Use GetPersonPhotoUrl(...) instead.
- Web Sites
	- Rock will now auto compile your custom theme's .less files into .css files. Add a .nocompile to the theme's 'Styles' folder to disable auto-compile for a theme.

## Rock 4.0 Released January 22, 2016

---

People without birth date will no longer be able to check-in to groups that have an age range requirement. This behavior can be changed by editing the 'Unattended Check-in' workflow, selecting the 'Person Search' activity, then the 'Filter Groups By Age' action, and un-checking the new 'Age Required' option.

Only members of the 'RSR - Data Integrity Worker' will be able to complete person merges. Everyone else will only be able to request merges (new functionality). This can be modified by adding other security roles to have edit access to the merge block.

Security was adjusted on the Website Ads and Bulletin Content Channels to give the 'RSR - Staff Worker' and 'RSR - Staff Like Worker' View/Edit rights.

- Requires SQL 2012 (or Azure SQL V12) or greater
- a [Change to GatewayComponent](https://github.com/SparkDevNetwork/Rock/commit/8d721d530d9b662e8a33d142518722f2982c164e#diff-b6b3fe48e4456c09528cf7840e2dc2c5L30) effecting custom finance gateways
- Rock.Model.Person.IsDeceased - Property will no longer be nullable. Any code that references .HasValue (or expects the property to be nullable) will need to change.
- Financial Gateway
	- Rock.Financial.GatewayComponent.AddScheduledPayment()- Added additional FinancialGateway parameter
		- Rock.Financial.GatewayComponent.Authorize() - added additional FinancialGateway parameter
		- Rock.Financial.GatewayComponent.BatchTimeOffset - Removed property ( Is now a property of new FinancialGateway model )
		- Rock.Financial.GatewayComponent.Charge() - added additional FinancialGateway parameter
		- Rock.Financial.GatewayComponent.GetPayments() - added additional FinancialGateway parameter
		- Rock.Financial.TestGateway.AddScheduledPayment()- Added additional FinancialGateway parameter
		- Rock.Financial.TestGateway.Charge() - added additional FinancialGateway parameter
		- Rock.Financial.TestGateway.GetPayments() - added additional FinancialGateway parameter
		- Rock.Model.FinancialPersonSavedAccount.GatewayEntityType - Removed property ( use FinancialGateway property instead )
		- Rock.Model.FinancialPersonSavedAccount.GatewayEntityTypeId - Removed property ( use FinancialGatewayId property instead )
		- Rock.Model.FinancialScheduledTransaction.GatewayEntityType - Removed property ( use FinancialGateway property instead )
		- Rock.Model.FinancialScheduledTransaction.GatewayEntityTypeId - Removed property ( use FinancialGatewayId property instead )
		- Rock.Model.FinancialScheduledTransactionService.ProcessPayments() - Added additional FinancialGateway parameter
		- Rock.Model.FinancialTransaction.GatewayEntityType - Removed property ( use FinancialGateway property instead )
		- Rock.Model.FinancialTransaction.GatewayEntityTypeId - Removed property ( use FinancialGatewayId property instead )
- Rock.Model.AttendanceSummaryData (Removed)
- Rock.Model.BinaryFileType.PreferredColorDepth - Property returns new 'ColorDepth' enumeration instead of removed 'PreferredColorDepth' enumeration
- Rock.Model.BinaryFileType.PreferredFormat - Property returns new 'Format' enumeration instead of removed 'PreferredFormat' enumeration
- Rock.Model.BinaryFileType.PreferredResolution - Property returns new 'Resolution' enumeration instead of removed 'PreferredResolution' enumeration
- Rock.Model.GroupService.GetNavigationChildren() - Added additional IncludeInactiveGroups parameter
- Rock.Model.PreferredColorDepth - Removed ( use ColorDepth instead )
- Rock.Model.PreferredFormat - Removed ( use Format instead )
- Rock.Model.PreferredResolution - Removed ( use Resolution instead )
- Rock.Model.ScheduleService.GetGroupOccurrences() - Added FromDateTime, ToDateTime, LocationId, and ScheduleId paramters
- Rock.Reporting.EntityField - Parameterless constructor removed, added FieldType paramter to second constructor
- Rock.SystemGuid.Page.PLUGIN\_MANAGER - removed
- Rock.SystemGuid.Page.PLUGIN\_SETTINGS - removed
- Rock.Web.UI.Controls.Grid.MergePageRoute - removed ( MergeTemplatePageRoute property added )
- Rock.Web.UI.Controls.GridActions.MergeClick - removed ( MergeTemplateClick handler added )

## Rock 3.0 Released April 13, 2015

---

**Heads Up!** We've added several new features to groups to support the attendance and group finder features. The update will modify some of the settings to the 'Small Group' group type. If you've modified or are using this group type you'll want to read through these changes below. The update will do the following...
1. Update the Small Group type to make it use the new 'simple' schedule option (day of week + meeting time).
2. Add a new group attribute of Topic that links to a defined type.
3. Take all the existing text topics and create defined values out of them, then match them to the groups (basically wire up all the current text based topics as defined values)
4. Delete the existing text topic group attribute.
5. If you do NOT have any small groups in the database we will delete the meeting time attribute from the small group type (otherwise we'll leave it for you to delete since you'll probably need it to set the new meeting time value).
- Rock.Workflow.Action.SetAttribute*To*Entity was renamed to Rock.Workflow.Action.SetAttribute*From*Entity
- Person.BirthDate property became readonly - this was due to [change](https://github.com/SparkDevNetwork/Rock/commit/3d35dafb5f2eb3ba811894a2ce87950c3c97fc63#diff-6ee7e66886a92f2f60080cff30af32cc) to allow people to enter partial birthdates (month and day with no year). Use SetBirthDate to set the full birthdate and use Person.BirthMonth, Person.BirthDay if partial.
- Storage Provider changes
	- a storage provider will now provide the path to the resource via the GetPath() method and GetUrl() will provide a URL to the resource. GenerateUrl() is no longer used.
		- BinaryContentStream ?
		- GetContentStream() method is responsible to obtain a stream of the item resource.
- Binary Files Methods/Objects changes:
	- BinaryFile.Data became BinaryFile.DatabaseData.
		- BinaryFile.ContentStream now uses the StorageProvider's GetContentStream() to get the stream of the content.
		- BinaryFile*Data*.ContentStream (virtual) was removed and the BinaryFile.ContentStream should now be used to get a stream to the resource.
- The "Unknown" value was removed from the Marital Status DefinedType and records with that ID were given a NULL MaritalStatusValueId.

