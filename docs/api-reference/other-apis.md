---
sidebar_position: 8
---

# Other APIs

## Horse API (horse.*)

### Horse Management

```lua
-- Horse Level
horse.get_level()           -- Returns: Number - Horse level
horse.set_level(level)      -- Set horse level (1-30)

-- Horse Stats
horse.get_hp()              -- Returns: Number - Horse HP
horse.get_stamina()         -- Returns: Number - Horse stamina

-- Mount/Dismount
horse.ride()                -- Mount horse
horse.unride()              -- Dismount horse (if exists)

-- Example (Beginner Equipment)
when login with pc.getqf("got_horse") == 0 begin
    horse.set_level(21)
    horse.ride()
    pc.setqf("got_horse", 1)
end
```

## Building API (building.*)

### Guild Building

```lua
-- Reconstruct Building
building.reconstruct(vnum)  -- Change building type

-- Example (Guild Smithy)
when 20060.click with pc.isguildmaster() begin
    say("Change smithy specialization?")
    
    local specializations = {
        {14043, "Diamond"},
        {14045, "Wood"},
        {14046, "Copper"},
    }
    
    -- Selection menu created from table
    local menu = {}
    for i, data in ipairs(specializations) do
        table.insert(menu, data[2].." Specialization")
    end
    
    local s = select_table(menu, "Cancel")
    
    if s <= #specializations then
        if pc.get_gold() >= 3000000 then
            pc.changegold(-3000000)
            building.reconstruct(specializations[s][1])
            say("Smithy specialized!")
        end
    end
end
```
