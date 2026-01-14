---
sidebar_position: 1
---

# Player API (pc.*)

## Character Information

```lua
-- Basic Info
pc.get_name()           -- Returns: String - Character name
pc.get_level()          -- Returns: Number - Current level
pc.get_next_exp()       -- Returns: Number - EXP needed for next level
pc.get_exp()            -- Returns: Number - Current EXP
pc.get_player_id()      -- Returns: Number - Unique player ID
pc.get_account_id()     -- Returns: Number - Account ID

-- Job/Class
pc.get_job()            -- Returns: Number (0-4: Warrior, Ninja, Sura, Shaman, Lycan)
pc.job                  -- Alternative syntax
pc.get_race()           -- Returns: Number (0-7: race variations)
pc.get_sex()            -- Returns: Number (0=Male, 1=Female)

-- Location
pc.get_empire()         -- Returns: Number (1=Shinsoo, 2=Chunjo, 3=Jinno)
pc.empire               -- Alternative syntax
pc.get_map_index()      -- Returns: Number - Current map index
pc.get_x()              -- Returns: Number - X coordinate (pixels)
pc.get_y()              -- Returns: Number - Y coordinate (pixels)

-- GM Check
pc.is_gm()              -- Returns: Boolean - Is GM?
```

## Stats & Attributes

```lua
-- HP/MP
pc.get_hp()             -- Returns: Number - Current HP
pc.get_max_hp()         -- Returns: Number - Maximum HP
pc.get_sp()             -- Returns: Number - Current MP/SP
pc.get_max_sp()         -- Returns: Number - Maximum MP/SP

-- Base Stats
pc.get_st()             -- Returns: Number - Strength (STR)
pc.get_dx()             -- Returns: Number - Dexterity (DEX)
pc.get_iq()             -- Returns: Number - Intelligence (INT)
pc.get_ht()             -- Returns: Number - Vitality (VIT)

-- Modify HP/MP
pc.change_hp(amount)    -- Modify HP (+/-)
pc.change_sp(amount)    -- Modify MP (+/-)
pc.heal_hp()            -- Full HP restore
pc.heal_sp()            -- Full MP restore

-- Example
if pc.get_hp() < pc.get_max_hp() / 2 then
    pc.heal_hp()
    chat("HP restored!")
end
```

## Currency (Yang)

```lua
-- Get Yang
pc.get_gold()           -- Returns: Number - Current yang

-- Modify Yang
pc.change_gold(amount)  -- Add/subtract yang
pc.change_money(amount) -- Alternative (same function)
pc.changegold(amount)   -- Alternative (same function)

-- Example
if pc.get_gold() >= 1000000 then
    pc.change_gold(-1000000)
    chat("Spent 1 million yang!")
else
    chat("Not enough yang!")
end
```

## Experience

```lua
-- Give EXP
pc.give_exp(amount)         -- Give EXP (raw)
pc.give_exp2(amount)        -- Give EXP (with bonuses/buffs)

-- Percentage of required EXP
pc.give_exp_perc(percent, min, max)
-- percent: % of required EXP
-- min: minimum EXP to give
-- max: maximum EXP to give

-- Example
pc.give_exp2(100000)  -- 100k EXP with buffs
pc.give_exp_perc(10, 0, 1000000)  -- 10% of required, max 1M
```

## Items

```lua
-- Give Items
pc.give_item2(vnum, count)      -- Give item (preferred method)
pc.give_item(vnum, count)       -- Deprecated, use give_item2

-- Count Items
pc.count_item(vnum)             -- Returns: Number - Item count in inventory
pc.countitem(vnum)              -- Alternative (same function)

-- Remove Items
pc.remove_item(vnum, count)     -- Remove items from inventory

-- Equipment Check
pc.get_wear(position)           -- Returns: Number - Item vnum in slot (0 if empty)

-- Equipment Positions:
-- 0 = Body (Armor)
-- 1 = Head (Helmet)
-- 2 = Shoes
-- 3 = Wrist (Bracelet)
-- 4 = Weapon
-- 5 = Neck (Necklace)
-- 6 = Ear (Earrings)
-- 7 = Shield

-- Examples
if pc.count_item(30001) >= 10 then
    pc.remove_item(30001, 10)
    pc.give_item2(30002, 1)
    chat("Items exchanged!")
end

local weapon = pc.get_wear(4)
if weapon == 0 then
    chat("No weapon equipped!")
end
```

## Quest Flags (Persistent Storage)

```lua
-- Set Flag
pc.setqf("flag_name", value)    -- Store number
pc.setq("flag_name", value)     -- Alternative (less common)

-- Get Flag
pc.getqf("flag_name")           -- Returns: Number (0 if not set)
pc.getq("flag_name")            -- Alternative

-- Delete Flag
pc.delqf("flag_name")           -- Remove flag

-- Examples
-- Daily quest reset
local today = os.date("%Y%m%d")
local last_reset = pc.getqf("last_reset")

if tonumber(today) ~= last_reset then
    pc.setqf("daily_kills", 0)
    pc.setqf("last_reset", tonumber(today))
end

-- Kill counter
local kills = pc.getqf("monster_kills")
pc.setqf("monster_kills", kills + 1)

-- Completion flag
pc.setqf("quest_complete", 1)
```

## Teleportation

```lua
-- Warp (same map)
pc.warp(x, y)               -- Teleport to coordinates (pixels * 100)

-- Special warps
pc.warp_to_village()        -- Return to village
pc.warp_exit()              -- Exit dungeon

-- Example
pc.warp(100*100, 200*100)   -- Teleport to (100, 200) in pixels
pc.warp_to_village()         -- Safe return
```

## Skills

```lua
-- Skill Books
pc.give_skill_book(skill_id, chance, required_level)
-- skill_id: Skill number
-- chance: Success chance (0-100)
-- required_level: Minimum level to use

-- Get Skill Level
pc.get_skill_level(skill_id)    -- Returns: Number - Skill level

-- Skill Group
pc.get_skill_group()             -- Returns: Number (1 or 2)
pc.set_skill_group(group)        -- Set skill group (1 or 2)

-- Example
pc.give_skill_book(1, 100, 20)  -- 100% success, level 20+ required
```

## Guild

```lua
-- Guild Membership
pc.hasguild()               -- Returns: Boolean - Has guild?
pc.get_guild()              -- Returns: Number - Guild ID (0 if none)

-- Guild Leadership
pc.isguildmaster()          -- Returns: Boolean - Is guild leader?
pc.is_guild_master()        -- Alternative syntax

-- Guild Actions
pc.remove_from_guild()      -- Leave guild
pc.destroy_guild()          -- Disband guild (leader only)

-- Example
if not pc.hasguild() then
    chat("You need to be in a guild!")
    return
end

if pc.isguildmaster() then
    say("Guild leader menu...")
end
```

## State Checks

```lua
-- Dungeon
pc.in_dungeon()             -- Returns: Boolean - In dungeon?

-- Combat/Actions
pc.is_polymorphed()         -- Returns: Boolean - Transformed?
pc.is_dead()                -- Returns: Boolean - Dead?
pc.is_riding()              -- Returns: Boolean - On horse?
pc.is_mining()              -- Returns: Boolean - Mining?

-- Proximity
pc.is_near_vid(vid, distance) -- Returns: Boolean - Near VID?

-- War
pc.get_war_map()            -- Returns: Number - War map index

-- Example
if pc.is_dead() then
    return  -- Don't run quest if dead
end

if pc.in_dungeon() then
    chat("You're in a dungeon!")
end
```

## Refinement (Item Upgrading)

```lua
-- Ore/Diamond Refinement
pc.ore_refine(cost, success_pct, geiststein_cell)
pc.diamond_refine(cost, success_pct)

-- Returns: Boolean - Success or failure

-- Used in guild buildings for item refinement
```
