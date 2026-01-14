---
sidebar_position: 4
---

# User Interface

## Dialog System

### Say Commands

```lua
-- Dialog Text
say(text)                   -- Add text line to dialog
say_title(title)            -- Set dialog title
say_reward(text)            -- Green reward text
say_item(name, vnum, count) -- Display item icon

-- Spacing
say("")                     -- Empty line

-- Example
say_title("Quest NPC:")
say("")
say("Hello, adventurer!")
say("I have a quest for you.")
say("")
say_reward("Reward: 100,000 Yang")
say_item("Sword", 30001, 1)
```

### Multi-Page Dialogs

```lua
-- wait() creates next page
when 9006.click begin
    say_title("Page 1:")
    say("This is the first page.")
    wait()  -- Next page
    
    say_title("Page 2:")
    say("This is the second page.")
    wait()
    
    say_title("Page 3:")
    say("This is the last page.")
end
```

### Selection Menus

```lua
-- Simple Select
select("Option 1", "Option 2", "Option 3")
-- Returns: Number (1, 2, 3, ...)

-- Example
local s = select("Accept Quest", "Decline", "Ask Questions")

if s == 1 then
    chat("Quest accepted!")
elseif s == 2 then
    chat("Quest declined.")
else
    say("What would you like to know?")
end
```

### Table-Based Selection

```lua
-- Select from table
select_table(table, cancel_text)

-- Example 1: Simple List
local options = {"Warrior", "Ninja", "Sura", "Shaman"}
local choice = select_table(options, "Cancel")

if choice == #options + 1 then
    return  -- Cancel was selected
end

chat("You selected: "..options[choice])

-- Example 2: Complex Data
local items = {
    {"Sword", 30001, 10000},
    {"Armor", 11209, 50000},
    {"Helmet", 12209, 25000}
}

local menu = {}
for i, data in ipairs(items) do
    table.insert(menu, data[1].." - "..data[3].." Yang")
end

local s = select_table(menu, "Cancel")

if s <= #items then
    local selected = items[s]
    say("You selected: "..selected[1])
    say_item(selected[1], selected[2], 1)
end
```

### Input

```lua
-- Text Input
input()                     -- Returns: String - User input

-- Example
say("Enter your favorite color:")
local color = input()
chat("Your favorite color is: "..color)

-- Numeric Input
say("How many items do you want?")
local count_str = input()
local count = tonumber(count_str)

if count and count > 0 then
    pc.give_item2(30001, count)
end
```

### Window Control

```lua
-- Set Window Skin
setskin(NOWINDOW)       -- Hide dialog window

-- Used after opening shops, storage, etc.
when 9009.chat."Shop" begin
    npc.open_shop()
    setskin(NOWINDOW)  -- Hide quest window
end
```

---

## Chat & Notifications

### Chat Messages

```lua
-- Regular Chat
chat(text)              -- White text in chat

-- System Chat
syschat(text)           -- Yellow system message

-- Examples
chat("Regular message")
syschat("System notification")
```

### Server-Wide Notifications

```lua
-- Notice (top of screen)
notice(text)            -- Server-wide notice
notice_all(text)        -- Alternative (same function)

-- Shout (larger area)
shout(text)             -- Larger range than chat

-- Examples
notice("Server event starting!")
notice_all("Maintenance in 10 minutes!")
```

### Formatting

```lua
-- String Concatenation
chat("Your level: "..pc.get_level())

-- Multiple Values
local name = pc.get_name()
local level = pc.get_level()
chat(name.." is level "..level)

-- String Formatting
say(string.format("Cost: %s Yang", 1000000))
say(string.format("Level %d required", 50))
```

---

## Letter & Button System

### Quest Button

```lua
-- Create Quest Button
send_letter(text)           -- Create clickable quest button
makequestbutton(text)       -- Alternative

-- Remove Button (automatically removed when quest completes)
-- Use set_state(__COMPLETE__) to remove

-- Example
when letter begin
    send_letter("Daily Quest Available")
end

when button begin
    say_title("Daily Quest:")
    say("Complete today's challenge!")
    
    if select("Accept", "Decline") == 1 then
        set_state(quest_active)
    else
        set_state(__COMPLETE__)  -- Remove button
    end
end
```

### Complete Example

```lua
quest daily_quest begin
    state start begin
        -- Create button on login
        when login begin
            local completed = pc.getqf("daily_complete")
            
            if completed == 0 then
                send_letter("Daily Quest")
            end
        end
        
        -- Button clicked
        when button begin
            say_title("Daily Quest:")
            
            local kills = pc.getqf("daily_kills")
            say("Progress: "..kills.."/50 monsters")
            
            if kills >= 50 then
                if select("Claim Reward", "Later") == 1 then
                    pc.change_gold(1000000)
                    pc.setqf("daily_complete", 1)
                    set_state(__COMPLETE__)  -- Remove button
                end
            end
        end
        
        -- Count kills
        when kill begin
            local kills = pc.getqf("daily_kills") + 1
            pc.setqf("daily_kills", kills)
            
            if kills == 50 then
                syschat("Daily quest complete! Check quest button!")
            end
        end
    end
    
    state __COMPLETE__ begin
    end
end
```

---

## Special Windows

### Item Selection

```lua
-- Select Item from Inventory
select_item()           -- Returns: Number - Cell position (0 if cancelled)

-- Example (Refinement)
say("Select a spirit stone:")
local cell = select_item()

if cell == 0 then
    say("Cancelled.")
    return
end

if item.select_cell(cell) then
    local vnum = item.get_vnum()
    chat("You selected item: "..vnum)
end
```

### Shop System

```lua
-- Open NPC Shop
npc.open_shop()

-- Must use setskin(NOWINDOW) after
when 9009.chat."Shop" begin
    npc.open_shop()
    setskin(NOWINDOW)
end
```

### Storage Systems

```lua
-- Warehouse
game.open_safebox()

-- Item Mall Storage
game.open_mall()

-- Example
when 9005.chat."Storage" begin
    local s = select("Warehouse", "Mall", "Cancel")
    
    if s == 1 then
        game.open_safebox()
        setskin(NOWINDOW)
    elseif s == 2 then
        game.open_mall()
        setskin(NOWINDOW)
    end
end
```
