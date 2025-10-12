export const oxLibAdapter = {
  notify: (message: string, type: "success" | "error") =>
    TriggerEvent("ox_lib:notify", {
      title: "Fishing",
      description: message,
      type,
    }),
};

export const qbCoreAdapter = {
  notify: (message: string, type: "success" | "error") => {
    exports["qb-core"].GetCoreObject?.().Functions.Notify(message, type);
  },
};

export const esxAdapter = {
  notify: (message: string, type: "success" | "error") => {
    const ESX = exports["es_extended"]?.getSharedObject?.();
    ESX?.ShowNotification?.(message, type, 5000);
  },
};
