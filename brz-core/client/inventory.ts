import {
  qbCoreAdapter as qbCoreClientAdapter,
  oxInventoryAdapter as oxInventoryClientAdapter,
  esxInventoryAdapter as esxInventoryClientAdapter,
} from "../client/adapters/inventory.adapter";
import { getAdapter } from "../shared/thirdparties";
import { InventoryClientAdapter } from "../shared/inventory";

declare const SETTINGS: any;

type AdapterName = "qbCore" | "ox_inventory";

const enabledAdapter: AdapterName = SETTINGS.INVENTORY_SYSTEM || "ox_inventory";

type InventoryAdapters = {
  [key in AdapterName]: InventoryClientAdapter;
};

const getClientAdapter = () =>
  getAdapter<InventoryAdapters, InventoryClientAdapter>(
    {
      qbCore: qbCoreClientAdapter,
      ox_inventory: oxInventoryClientAdapter,
      esx_inventory: esxInventoryClientAdapter,
    },
    enabledAdapter
  );

export const hasItem = (itemName: string) =>
  getClientAdapter().hasItem(itemName);

export const getUseItemHookName = (): string =>
  getClientAdapter().useItemHookName;

export const getUseItemHookHandler = () =>
  getClientAdapter().useItemHookHandler;
