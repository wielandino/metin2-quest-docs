---
sidebar_position: 7
---

# Quick Reference

## Essential Commands

### Player Commands

```lua
-- Character Info
pc.get_name()              -- Player name
pc.get_level()             -- Current level
pc.get_gold()              -- Yang amount
pc.get_exp()               -- Current EXP

-- Modify Resources
pc.change_gold(amount)     -- Add/subtract yang
pc.give_item2(vnum, count) -- Give items
pc.give_exp2(amount)       -- Give EXP with bonuses

-- Quest Flags
pc.setqf(name, value)      -- Set persistent flag
pc.getqf(name)             -- Get flag value
pc.delqf(name)             -- Delete flag

-- Teleport
pc.warp(x, y)              -- Teleport (pixels * 100)
pc.warp_to_village()       -- Return to spawn

-- Checks
pc.hasguild()              -- Has guild?
pc.is_gm()                 -- Is GM?
pc.in_dungeon()            -- In dungeon?
```

### Dialog System

```lua
-- Dialog Text
say_title(title)           -- Set title
say(text)                  -- Add line
say_reward(text)           -- Green text
say("")                    -- Empty line

-- Selection
select("Opt1", "Opt2")     -- Returns 1, 2, etc.
select_table(table, cancel)-- Table-based menu
input()                    -- Text input

-- Multi-page
wait()                     -- Next page
```

### Chat & Notifications

```lua
chat(text)                 -- White chat message
syschat(text)              -- Yellow system message
notice(text)               -- Server-wide notice
```

### NPC Commands

```lua
npc.get_race()             -- NPC vnum
npc.get_level()            -- NPC level
npc.open_shop()            -- Open shop
```

### Item Commands

```lua
item.get_vnum()            -- Item vnum
item.get_count()           -- Stack count
item.remove()              -- Remove item
item_name(vnum)            -- Get name by vnum
```

### Control Flow

```lua
set_state(name)            -- Change quest state
timer(name, seconds)       -- Set timer
return                     -- Exit event
```

### Time & Math

```lua
get_time()                 -- Unix timestamp
os.date("%Y%m%d")          -- Date string
number(min, max)           -- Random number
math.floor(n)              -- Round down
```

---

## Common Patterns

### Daily Reset

```lua
local today = tonumber(os.date("%Y%m%d"))
if today ~= pc.getqf("last_day") then
    pc.setqf("counter", 0)
    pc.setqf("last_day", today)
end
```

### Cooldown Check

```lua
local current = get_time()
local last = pc.getqf("last_use")
if current - last < 3600 then
    say("Cooldown active!")
    return
end
pc.setqf("last_use", current)
```

### Level Requirement

```lua
if pc.get_level() < 50 then
    say("Need level 50!")
    return
end
```

### Gold Check

```lua
if pc.get_gold() < 1000 then
    say("Need 1000 Yang!")
    return
end
```

### Item Count Check

```lua
if pc.count_item(30001) < 10 then
    say("Need 10 items!")
    return
end
```

### Table Iteration

```lua
for i, data in ipairs(table) do
    -- use data
end
```

---

## Quest Template

```lua
quest template begin
    state start begin
        when login begin
            -- Initialize
        end
        
        when 9006.click begin
            say_title("NPC:")
            say("Dialog text")
            
            if select("Yes", "No") == 1 then
                -- Action
                set_state(next_state)
            end
        end
    end
    
    state next_state begin
        when button begin
            say("Progress info")
        end
    end
    
    state __COMPLETE__ begin
    end
end
```

---

## Complete Quest Examples

### Simple Reward Quest

```lua
quest simple_reward begin
    state start begin
        when 9006.click begin
            if pc.getqf("received") == 1 then
                say("Already received!")
                return
            end
            
            say_title("Friendly NPC:")
            say("Welcome! Have a gift!")
            
            pc.give_item2(30001, 1)
            pc.change_gold(100000)
            pc.setqf("received", 1)
            
            say_reward("You received a sword and 100k yang!")
        end
    end
end
```

### Daily Kill Quest

```lua
quest daily_kills begin
    state start begin
        when login begin
            local today = tonumber(os.date("%Y%m%d"))
            local last_day = pc.getqf("last_reset")
            
            if today ~= last_day then
                pc.setqf("kills", 0)
                pc.setqf("claimed", 0)
                pc.setqf("last_reset", today)
            end
        end
        
        when kill begin
            if pc.getqf("claimed") == 0 then
                local kills = pc.getqf("kills") + 1
                pc.setqf("kills", kills)
                
                if kills >= 100 then
                    syschat("Daily quest complete!")
                end
            end
        end
        
        when 9006.click begin
            local kills = pc.getqf("kills")
            local claimed = pc.getqf("claimed")
            
            say_title("Daily Quest:")
            say("Progress: "..kills.."/100")
            
            if claimed == 1 then
                say("Already claimed today!")
            elseif kills >= 100 then
                if select("Claim Reward", "Later") == 1 then
                    pc.change_gold(1000000)
                    pc.setqf("claimed", 1)
                end
            end
        end
    end
end
```

### Item Shop

```lua
quest item_shop begin
    state start begin
        when 9006.click begin
            say_title("Item Shop:")
            
            local items = {
                {"Sword", 30001, 100000},
                {"Armor", 11209, 500000},
                {"Helmet", 12209, 250000}
            }
            
            local menu = {}
            for i, data in ipairs(items) do
                table.insert(menu, data[1].." - "..data[3].." Yang")
            end
            table.insert(menu, "Exit")
            
            local s = select_table(menu, "")
            
            if s == #menu then
                return
            end
            
            local item = items[s]
            
            if pc.get_gold() >= item[3] then
                pc.change_gold(-item[3])
                pc.give_item2(item[2], 1)
                say_reward("Purchase complete!")
            else
                say("Not enough Yang!")
            end
        end
    end
end
```

---

## Tips & Tricks

- **Always** check prerequisites (level, gold, items) before actions
- Use **local variables** to cache frequently accessed values
- **Early returns** improve code readability
- Use **descriptive names** for quest flags
- Test with **GM characters** for faster development
- Add **debug chat messages** during development (remove before release)
- Use **tables** for item lists and menus
- **Document** complex logic with comments
- Keep **quest names** matching **file names**
- Use **state changes** for multi-step quests
