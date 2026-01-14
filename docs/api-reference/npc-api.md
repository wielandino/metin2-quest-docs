---
sidebar_position: 2
---

# NPC API (npc.*)

## NPC Information

```lua
-- Basic Info
npc.get_race()          -- Returns: Number - NPC vnum
npc.get_level()         -- Returns: Number - NPC level
npc.get_name()          -- Returns: String - NPC name

-- Location
npc.get_x()             -- Returns: Number - X coordinate
npc.get_y()             -- Returns: Number - Y coordinate

-- Faction
npc.get_empire()        -- Returns: Number - Empire (1-3)
npc.empire              -- Alternative syntax

-- Guild
npc.get_guild()         -- Returns: Number - Guild ID

-- Type Check
npc.is_pc()             -- Returns: Boolean - Is player? (not NPC)

-- Example
when kill begin
    local mob_vnum = npc.get_race()
    local mob_level = npc.get_level()
    
    if mob_vnum == 101 and mob_level > 50 then
        chat("You killed a high-level wolf!")
    end
end
```

## NPC Actions

```lua
-- Kill/Remove
npc.kill()              -- Kill the NPC
npc.purge()             -- Despawn the NPC

-- Shop
npc.open_shop()         -- Open NPC shop

-- Example
when 9009.chat."Shop" begin
    npc.open_shop()
    setskin(NOWINDOW)  -- Hide dialog window
end
```
