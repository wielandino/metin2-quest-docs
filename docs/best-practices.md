---
sidebar_position: 6
---

# Best Practices

## Design Patterns

### 1. Code Organization

```lua
-- Good: Organized and modular
quest organized_example begin
    -- Configuration
    local REQUIRED_LEVEL = 50
    local REWARD_YANG = 100000
    
    -- Helper functions
    function CheckRequirements()
        return pc.get_level() >= REQUIRED_LEVEL
    end
    
    state start begin
        when 9006.click begin
            if not organized_example.CheckRequirements() then
                say("Need level "..REQUIRED_LEVEL)
                return
            end
            -- Main logic
        end
    end
end
```

### 2. Reusable Functions

```lua
quest shop_system begin
    -- Reusable cost calculation
    function CalculateCost(base_cost)
        if pc.empire ~= npc.empire then
            return base_cost * 3
        end
        return base_cost
    end
    
    -- Reusable purchase logic
    function Purchase(vnum, cost)
        if pc.get_gold() >= cost then
            pc.change_gold(-cost)
            pc.give_item2(vnum, 1)
            return true
        end
        return false
    end
    
    state start begin
        when 9006.click begin
            local cost = shop_system.CalculateCost(10000)
            if shop_system.Purchase(30001, cost) then
                say("Purchase complete!")
            else
                say("Not enough Yang!")
            end
        end
    end
end
```

### 3. Defensive Programming

Always validate input and state:

```lua
when 9006.click begin
    -- Check prerequisites
    if pc.is_dead() then
        return
    end
    
    if pc.get_level() < 50 then
        say("Minimum level: 50")
        return
    end
    
    if not pc.hasguild() then
        say("You need a guild!")
        return
    end
    
    -- Main logic here
end
```

### 4. Clear Error Messages

```lua
-- Good: Specific messages
if pc.get_level() < 50 then
    say("You need to be level 50 or higher.")
    say("Current level: "..pc.get_level())
    return
end

-- Bad: Vague messages
if pc.get_level() < 50 then
    say("Cannot proceed.")
    return
end
```

### 5. Consistent Naming

```lua
-- Good: Descriptive, consistent
pc.setqf("daily_monster_kills", 0)
pc.setqf("daily_metin_breaks", 0)
pc.setqf("daily_quest_complete", 0)

-- Bad: Abbreviations, inconsistent
pc.setqf("dmk", 0)
pc.setqf("metin_count", 0)
pc.setqf("qc", 0)
```

---

## Performance Optimization

### 1. Minimize Quest Flag Access

```lua
-- Bad: Multiple reads
when kill begin
    if pc.getqf("kills") >= 100 then
        pc.setqf("kills", pc.getqf("kills") + 1)
    end
end

-- Good: Read once
when kill begin
    local kills = pc.getqf("kills")
    if kills < 100 then
        pc.setqf("kills", kills + 1)
    end
end
```

### 2. Early Returns

```lua
-- Good: Exit early
when kill begin
    if pc.getqf("complete") == 1 then
        return  -- Don't process if complete
    end
    
    -- Complex logic here
end

-- Bad: Nested conditions
when kill begin
    if pc.getqf("complete") == 0 then
        -- Complex logic here
    end
end
```

### 3. Efficient Loops

```lua
-- Good: ipairs for arrays
local items = {30001, 30002, 30003}
for i, vnum in ipairs(items) do
    pc.give_item2(vnum, 1)
end

-- Better: Cache size
local size = #items
for i = 1, size do
    pc.give_item2(items[i], 1)
end
```

### 4. Avoid Redundant Checks

```lua
-- Bad: Multiple level checks
when 9006.click begin
    if pc.get_level() >= 50 then
        say("Option 1")
        if pc.get_level() >= 50 then  -- Redundant
            -- logic
        end
    end
end

-- Good: Check once
when 9006.click begin
    local level = pc.get_level()
    
    if level >= 50 then
        say("Option 1")
        -- Use level variable
    end
end
```

---

## Error Handling

### 1. Null/Nil Checks

```lua
-- Safe item selection
local cell = select_item()
if cell == 0 then
    say("No item selected.")
    return
end

-- Safe type conversion
local input_str = input()
local number = tonumber(input_str)

if not number then
    say("Invalid number!")
    return
end
```

### 2. Boundary Checks

```lua
-- Check array bounds
local items = {30001, 30002, 30003}
local index = 5

if index <= #items then
    local vnum = items[index]
else
    chat("Index out of bounds!")
end
```

### 3. Resource Checks

```lua
-- Check before giving items
when kill begin
    -- Inventory space check (implicit in give_item2)
    pc.give_item2(30001, 1)
    
    -- Explicit checks for large quantities
    if pc.count_item(30001) + 100 <= 200 then  -- Max stack
        pc.give_item2(30001, 100)
    else
        chat("Not enough inventory space!")
    end
end
```

### 4. State Validation

```lua
-- Validate state before transitions
when 9006.click begin
    local current_stage = pc.getqf("quest_stage")
    
    -- Only allow certain transitions
    if current_stage == 0 then
        set_state(stage_1)
    elseif current_stage == 1 then
        set_state(stage_2)
    else
        say("Invalid quest state!")
    end
end
```

---

## Debugging Techniques

### 1. Debug Chat Messages

```lua
-- Temporary debug output
when kill begin
    local kills = pc.getqf("monster_kills")
    chat("DEBUG: kills = "..kills)  -- Remove before release
    
    kills = kills + 1
    pc.setqf("monster_kills", kills)
    
    chat("DEBUG: new kills = "..kills)
end
```

### 2. Variable Type Checking

```lua
-- Verify types
local value = pc.getqf("some_flag")
chat("Type: "..type(value))  -- Should be "number"
chat("Value: "..tostring(value))
```

### 3. Conditional Debugging

```lua
-- GM-only debug
when kill with pc.is_gm() begin
    local kills = pc.getqf("monster_kills")
    chat("[GM DEBUG] Kills: "..kills)
end
```

### 4. Quest Flag Inspection

```lua
-- Inspect all relevant flags
when 9006.click with pc.is_gm() begin
    say_title("Debug Info:")
    say("Kills: "..pc.getqf("monster_kills"))
    say("Complete: "..pc.getqf("quest_complete"))
    say("Stage: "..pc.getqf("quest_stage"))
end
```
