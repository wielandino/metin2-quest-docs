---
sidebar_position: 7
---

# Dungeon API (d.*)

## Dungeon Flags

```lua
-- Set/Get Dungeon Flags
d.setf(name, value)         -- Set dungeon flag
d.getf(name)                -- Get dungeon flag

-- Example
when login with pc.in_dungeon() begin
    local boss_killed = d.getf("boss_dead")
    if boss_killed == 1 then
        chat("Boss already defeated!")
    end
end
```

## Dungeon Management

```lua
-- Entry/Exit
d.join(map_index)           -- Join dungeon
d.exit()                    -- Exit dungeon

-- Mob Control
d.purge()                   -- Kill all mobs
d.kill_all()                -- Alternative (same as purge)
d.spawn_mob(vnum, x, y)     -- Spawn mob

-- Regen
d.set_regen_file(filename)  -- Set mob respawn file

-- Example
when 9006.click begin
    say("Enter dungeon?")
    if select("Yes", "No") == 1 then
        d.join(65)  -- Join map index 65
    end
end
```
