---
sidebar_position: 5
---

# Game API (game.*)

## Server-Wide Functions

```lua
-- Event Flags
game.get_event_flag(name)       -- Returns: Number - Flag value
game.set_event_flag(name, value) -- Set event flag

-- Example
if game.get_event_flag("double_exp") == 1 then
    chat("Double EXP event active!")
end
```

## Item Drops

```lua
-- Drop Item
game.drop_item(vnum, count)     -- Drop item on ground
game.drop_item_with_ownership(vnum, count, seconds)
-- Drop with ownership protection

-- Example
game.drop_item(30001, 1)  -- Drop sword
```

## Warehouse/Storage

```lua
-- Safebox (Warehouse)
game.set_safebox_level(level)   -- Set warehouse size (1-3)
game.open_safebox()             -- Open warehouse
game.open_mall()                -- Open item mall storage

-- Example
when 9005.click begin
    if pc.getqf("safebox_opened") == 0 then
        pc.change_gold(-500)
        game.set_safebox_level(1)
        pc.setqf("safebox_opened", 1)
    end
    
    say("Open warehouse?")
    local s = select("Warehouse", "Item Mall", "Cancel")
    if s == 1 then
        game.open_safebox()
        setskin(NOWINDOW)
    elseif s == 2 then
        game.open_mall()
        setskin(NOWINDOW)
    end
end
```

## Guild Functions

```lua
-- Request Guild Creation
game.request_make_guild()   -- Opens guild creation UI

-- Example
when 11000.chat."Create Guild" begin
    if pc.get_level() < 40 then
        say("You need level 40!")
        return
    end
    
    if pc.get_gold() < 500000 then
        say("You need 500,000 yang!")
        return
    end
    
    game.request_make_guild()
end
```
