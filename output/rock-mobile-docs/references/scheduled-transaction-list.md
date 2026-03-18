> **Path:** Mobile Docs > 🧱 Essentials > Blocks > Finance > Scheduled Transaction List

# Scheduled Transaction List

### M v7.0C v16.10

Displays a list of scheduled transactions.

## Block Configuration

### Template

The XAML template to display your scheduled transaction list with.

### Include Inactive

Choose whether to include inactive scheduled transactions in the list.

### Detail Page

The page will display the Giving Block when selecting a one of the scheduled transactions.

### Accounts

Filter the list of scheduled transactions by the associated accounts.

## Merge Fields

| Property | Type | Description |
| --- | --- | --- |
| DetailPage | Guid | The page selected in the Detail Page setting. |
| ScheduledTransactionInfo | FinancialScheduledTransaction | The info about the scheduled transaction. |
| FrequencyText | string | Representing the payment frequency associated with the scheduled transaction. |

### Styling

Since this is a XAML template, there’s no styling X-Ray available.
