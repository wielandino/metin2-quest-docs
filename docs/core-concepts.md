---
sidebar_position: 3
---

# Core Concepts

## Quest Syntax & Structure

### Basic Structure

Every quest follows this template:

```lua
quest <quest_name> begin
    state <state_name> begin
        when <event> begin
            -- Quest logic here
        end
    end
end
```

### Required Elements

1. **quest** keyword
2. **Quest name** - Must match filename (without extension)
3. **begin** and **end** pairs - Must be properly nested
4. **At least one state** - Minimum is `state start`
5. **At least one event** - e.g., `when login begin`

### Multiple States Example

```lua
quest multi_state_example begin
    state start begin
        when login begin
            chat("Quest started!")
            set_state(talking_to_npc)
        end
    end
    
    state talking_to_npc begin
        when 9006.click begin
            say("You found me!")
            set_state(collecting_items)
        end
    end
    
    state collecting_items begin
        when kill begin
            local kills = pc.getqf("kill_count") + 1
            pc.setqf("kill_count", kills)
            
            if kills >= 10 then
                chat("Quest complete!")
                set_state(__COMPLETE__)
            end
        end
    end
    
    state __COMPLETE__ begin
        -- Quest is complete, no more events
    end
end
```

### Special States

```lua
__COMPLETE__    -- Marks quest as completed
__GIVEUP__      -- Quest was abandoned
```

---

## Event System

### Event Types

#### Player Events

| Event | Trigger | Usage |
|-------|---------|-------|
| `login` | Player logs in | Welcome messages, daily resets |
| `logout` / `disconnect` | Player logs out | Save progress |
| `levelup` | Player levels up | Level rewards, unlock features |
| `kill` | Player kills mob | Monster hunting quests |
| `party_kill` | Party member kills | Party quests |
| `die` | Player dies | Death penalties |
| `button` / `info` | Quest button clicked | Quest UI interaction |
| `letter` / `enter` | Entering state | State initialization |
| `leave` | Leaving state | Cleanup |
| `chat` | Player sends chat | Chat commands |
| `unmount` | Dismounting horse | Horse-related quests |

#### NPC Events

```lua
-- NPC Click
when <npc_vnum>.click begin
    say("You clicked me!")
end

-- NPC Chat Option
when <npc_vnum>.chat."<option_text>" begin
    say("You selected this option!")
end

-- NPC Take (drag item to NPC)
when <npc_vnum>.take begin
    local item_vnum = item.get_vnum()
    say("You gave me item: "..item_vnum)
end
```

#### Item Events

```lua
-- Item Use
when <item_vnum>.use begin
    chat("You used the item!")
end

-- Item Click (in inventory)
when <item_vnum>.click begin
    chat("You clicked the item!")
end
```

#### Timer Events

```lua
when server_timer begin
    local timer_name = q.getcurrentquestindex()
    chat("Timer "..timer_name.." expired!")
end
```

### Conditional Events (with)

Use `with` to add conditions to events:

```lua
-- Level requirement
when kill with pc.get_level() >= 50 begin
    chat("High level kill!")
end

-- Specific monster
when kill with npc.get_race() == 101 begin
    chat("You killed a wolf!")
end

-- Multiple conditions
when kill with npc.get_race() == 101 and pc.get_level() >= 30 begin
    chat("High level wolf kill!")
end

-- Item check
when take with item.get_vnum() == 30001 begin
    say("That's the sword I needed!")
end

-- GM only
when 9006.click with pc.is_gm() begin
    say("GM menu...")
end
```

---

## State Management

### What are States?

States represent different phases of a quest:
- **start** - Initial state (required)
- **Custom states** - Your quest phases
- **__COMPLETE__** - Quest finished
- **__GIVEUP__** - Quest abandoned

### Changing States

```lua
set_state(new_state_name)
```

### State Example: Multi-Step Quest

```lua
quest delivery_quest begin
    state start begin
        when 9006.chat."Deliver Package" begin
            say_title("Merchant:")
            say("Please deliver this package to the city!")
            
            if select("Accept", "Decline") == 1 then
                pc.give_item2(50001, 1)  -- Give package
                set_state(delivering)
            end
        end
    end
    
    state delivering begin
        when 9007.take with item.get_vnum() == 50001 begin
            say_title("Recipient:")
            say("Thank you for the delivery!")
            
            item.remove()  -- Remove package
            pc.change_gold(50000)  -- Reward
            
            set_state(return_to_merchant)
        end
        
        when button begin
            say("Deliver the package to the city!")
        end
    end
    
    state return_to_merchant begin
        when 9006.click begin
            say_title("Merchant:")
            say("Well done! Here's your reward.")
            
            pc.give_exp2(100000)
            set_state(__COMPLETE__)
        end
    end
    
    state __COMPLETE__ begin
        when 9006.click begin
            say("Thanks again for the delivery!")
        end
    end
end
```

### Enter/Leave Events

```lua
state example begin
    when enter begin
        -- Runs when entering this state
        syschat("Entering example state")
    end
    
    when leave begin
        -- Runs when leaving this state
        syschat("Leaving example state")
    end
    
    when login begin
        -- Normal event
    end
end
```

---

## Variables & Data Types

### Local Variables

```lua
local my_number = 42
local my_string = "Hello"
local my_boolean = true
local my_table = {1, 2, 3}
```

### Quest Flags (Persistent)

Quest flags are stored in the database and persist between sessions:

```lua
-- Set flag
pc.setqf("flag_name", 100)

-- Get flag (returns 0 if not set)
local value = pc.getqf("flag_name")

-- Delete flag
pc.delqf("flag_name")

-- Check if set
if pc.getqf("has_item") == 1 then
    chat("You have the item!")
end
```

### Data Types

#### Numbers

```lua
local integer = 42
local negative = -10
local large = 1000000
```

#### Strings

```lua
local name = "Player"
local message = "Hello"

-- Concatenation with ..
local greeting = "Hello " .. name

-- With numbers (automatic conversion)
local level_msg = "Your level is: " .. pc.get_level()
```

#### Booleans

```lua
local is_active = true
local is_complete = false

if is_active then
    chat("Active!")
end
```

#### Tables (Arrays)

```lua
-- Simple array
local items = {30001, 30002, 30003}

-- Access by index (1-based!)
local first_item = items[1]  -- 30001

-- Array of arrays
local data = {
    {"Name", 30001, 100},
    {"Sword", 30002, 200},
}

local sword_price = data[2][3]  -- 200
```

#### Tables (Dictionaries)

```lua
-- Key-value pairs
local npc_data = {
    name = "Guard",
    vnum = 9006,
    level = 50
}

-- Access
local npc_name = npc_data["name"]
-- or
local npc_name = npc_data.name
```

### Type Conversion

```lua
-- String to Number
local num = tonumber("123")  -- 123

-- Number to String
local str = tostring(123)    -- "123"

-- Check type
local t = type(variable)     -- "number", "string", "boolean", "table"
```

---

## Control Flow

### If Statements

```lua
-- Simple if
if pc.get_level() >= 50 then
    chat("High level!")
end

-- If-else
if pc.get_gold() >= 1000 then
    chat("You're rich!")
else
    chat("You're poor!")
end

-- If-elseif-else
local level = pc.get_level()
if level < 20 then
    chat("Beginner")
elseif level < 50 then
    chat("Intermediate")
elseif level < 80 then
    chat("Advanced")
else
    chat("Expert")
end

-- Multiple conditions
if pc.get_level() >= 50 and pc.get_gold() >= 1000000 then
    chat("High level AND rich!")
end

if pc.get_level() < 20 or pc.get_gold() < 1000 then
    chat("Beginner OR poor")
end

-- Negation
if not pc.hasguild() then
    chat("You have no guild!")
end
```

### Comparison Operators

```lua
==  -- Equal
~=  -- Not equal (note: not !=)
>   -- Greater than
<   -- Less than
>=  -- Greater or equal
<=  -- Less or equal
```

### Logical Operators

```lua
and  -- Logical AND
or   -- Logical OR
not  -- Logical NOT
```

### For Loops

```lua
-- Numeric for loop
for i = 1, 10 do
    chat("Number: "..i)
end

-- With step
for i = 0, 100, 10 do
    chat("Number: "..i)  -- 0, 10, 20, 30, ...
end

-- Iterate table with ipairs
local items = {30001, 30002, 30003}
for index, vnum in ipairs(items) do
    pc.give_item2(vnum, 1)
end

-- Iterate table with pairs
local data = {name="Guard", level=50}
for key, value in pairs(data) do
    chat(key.." = "..value)
end
```

### While Loops

```lua
local counter = 0
while counter < 5 do
    counter = counter + 1
    chat("Counter: "..counter)
end
```

### Break and Return

```lua
-- Break - exits loop
for i = 1, 100 do
    if i == 50 then
        break  -- Exit loop at 50
    end
    chat("Number: "..i)
end

-- Return - exits function/event
when 9006.click begin
    if pc.get_level() < 50 then
        say("You need level 50!")
        return  -- Exit event early
    end
    
    say("Welcome!")
end
```
