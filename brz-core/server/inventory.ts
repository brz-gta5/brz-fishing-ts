import {
  oxInventoryAdapter as oxInventoryServerAdapter,
  qbCoreAdapter as qbCoreServerAdapter,
  esxAdapter as esxServerAdapter,
} from "../server/adapters/inventory.adapter";
import { InventoryServerAdapter } from "../shared/inventory";
import { getAdapter } from "../shared/thirdparties";

declare const SETTINGS: any;

type AdapterName = "qbCore" | "ox_inventory" | "esx_inventory";

const enabledAdapter: AdapterName = SETTINGS.INVENTORY_SYSTEM || "ox_inventory";

type InventoryAdapters = {
  [key in AdapterName]: InventoryServerAdapter;
};

const getServerAdapter = () =>
  getAdapter<InventoryAdapters, InventoryServerAdapter>(
    {
      qbCore: qbCoreServerAdapter,
      ox_inventory: oxInventoryServerAdapter,
      esx_inventory: esxServerAdapter,
    },
    enabledAdapter
  );

export const addItem = (source: number, itemName: string) =>
  getServerAdapter().addItem(source, itemName);

export const removeItem = (source: number, itemName: string) =>
  getServerAdapter().removeItem(source, itemName);

export const getItem = (itemName: string) =>
  getServerAdapter().getItem(itemName);
