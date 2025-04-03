
// For the status type casting in any function that handles inventory items:
// Convert string status to InventoryItemStatus type
const typedStatus = item.status as InventoryItemStatus;
const typedItem = {
  ...item,
  status: typedStatus
} as InventoryItem;
