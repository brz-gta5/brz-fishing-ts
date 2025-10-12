export const oxInventoryAdapter = {
  hasItem: (itemName: string) =>
    exports["ox_inventory"].GetItemCount(itemName) > 0,
  notify: (message: string, type: "success" | "error") =>
    TriggerEvent("ox_lib:notify", {
      title: "Fishing",
      description: message,
      type,
    }),
  useItemHookName: "ox_inventory:usedItem",
  useItemHookHandler: (item: string[], slotId: number, metadata: any) => ({
    itemName: item[0],
    itemType: "use",
  }),
};

export const qbCoreAdapter = {
  hasItem: (itemName: string) =>
    !!exports["qb-core"].GetCoreObject?.().Functions.HasItem(itemName),
  notify: (message: string, type: "success" | "error") => {
    exports["qb-core"].GetCoreObject?.().Functions.Notify(message, type);
  },
  useItemHookName: "inventory:client:ItemBox",
  useItemHookHandler: (params: [any, "use" | string]) => {
    const [itemData, type] = params;

    return {
      itemName: itemData.name,
      itemType: type,
    };
  },
};

export const esxInventoryAdapter = {
  hasItem: (itemName: string) => {
    const ESX = exports["es_extended"]?.getSharedObject?.();
    if (!ESX?.PlayerData?.inventory) return false;

    for (const item of ESX.PlayerData.inventory) {
      if (item.name === itemName && item.count > 0) {
        return true;
      }
    }
    return false;
  },
  notify: (message: string, type: "success" | "error") => {
    const ESX = exports["es_extended"]?.getSharedObject?.();
    ESX?.ShowNotification?.(message, type, 5000);
  },
  useItemHookName: "esx:useItem",
  useItemHookHandler: (itemName: string) => ({
    itemName,
    itemType: "use",
  }),
};
