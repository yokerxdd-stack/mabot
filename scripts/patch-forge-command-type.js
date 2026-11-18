const fs = require("node:fs");

const file = require.resolve(
  "minecraft-protocol-forge/src/client/commandRegistry.js",
);
let source = fs.readFileSync(file, "utf8");
const anchor = "    'neoforge:modid': 'void',\n";
// These server command argument types use SingletonArgumentInfo, so they add no wire properties.
const additions = [
  "    'creativecore:string_array': 'void',\n",
  "    'curios:slot_type': 'void',\n",
  "    'exposure:color_palette_location': 'void',\n",
  "    'exposure:exposure_look': 'void',\n",
  "    'exposure:exposure_size': 'void',\n",
  "    'exposure:shader_location': 'void',\n",
  "    'exposure:texture_location': 'void',\n",
  "    'irons_spellbooks:spell': 'void',\n",
  "    'ponder:config_path': 'void',\n",
  "    'sophisticatedbackpacks:backpack_item': 'void',\n",
  "    'sophisticatedbackpacks:backpack_upgrade_item': 'void',\n",
  "    'sophisticatedbackpacks:backpack_uuid': 'void',\n",
  "    'sophisticatedbackpacks:player_name': 'void',\n",
  "    'sophisticatedbackpacks:template_name': 'void',\n",
];

for (const addition of additions) {
  if (source.includes(addition)) continue;
  if (source.split(anchor).length !== 2) {
    throw new Error("Could not apply the Forge command-type compatibility patch");
  }
  source = source.replace(anchor, anchor + addition);
}

fs.writeFileSync(file, source);

const handshakeFile = require.resolve(
  "minecraft-protocol-forge/src/client/forgeHandshake3.js",
);
let handshakeSource = fs.readFileSync(handshakeFile, "utf8");
const channelAnchor = "if (marker !== 'FML3') {";
// Do not claim ModernFix's optional ingredient-sync protocol; its recipe wire format is unsupported.
const filteredChannel = "if (marker !== 'FML3' && name !== 'modernfix:ingredient_sync') {";

if (!handshakeSource.includes(filteredChannel)) {
  if (handshakeSource.split(channelAnchor).length !== 2) {
    throw new Error("Could not disable unsupported ModernFix ingredient sync");
  }
  handshakeSource = handshakeSource.replace(channelAnchor, filteredChannel);
  fs.writeFileSync(handshakeFile, handshakeSource);
}
