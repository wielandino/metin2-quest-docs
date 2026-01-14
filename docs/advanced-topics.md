---
sidebar_position: 5
---

# Advanced Topics

## Timer & Scheduling

### Creating Timers

```lua
-- Set Timer
timer(name, seconds)

-- Example
when 9006.click begin
    say("Starting 10 second timer...")
    timer("my_timer", 10)
end
```

### Timer Events

```lua
-- Timer Expiration
when server_timer begin
    local timer_name = q.getcurrentquestindex()
    
    if timer_name == "my_timer" then
        notice("Timer expired!")
    end
end
```

### Complete Timer Example

```lua
quest timer_quest begin
    state start begin
        when 9006.click begin
            say("Start a countdown?")
            
            if select("Yes", "No") == 1 then
                pc.setqf("timer_started", 1)
                timer("countdown_10", 10)
                syschat("10 second countdown started!")
            end
        end
        
        when server_timer begin
            local timer_name = q.getcurrentquestindex()
            
            if timer_name == "countdown_10" then
                if pc.getqf("timer_started") == 1 then
                    notice(pc.get_name().."'s countdown finished!")
                    pc.give_item2(30001, 1)
                    pc.setqf("timer_started", 0)
                end
            end
        end
    end
end
```

### Repeating Timers

```lua
quest repeat_timer begin
    state start begin
        when login begin
            timer("heartbeat", 60)  -- Start timer
        end
        
        when server_timer begin
            if q.getcurrentquestindex() == "heartbeat" then
                -- Do something every 60 seconds
                syschat("Heartbeat check...")
                
                -- Restart timer for next cycle
                timer("heartbeat", 60)
            end
        end
    end
end
```

---

## Quest Functions

### Defining Functions

```lua
quest function_example begin
    -- Function definition
    function my_function(param1, param2)
        return param1 + param2
    end
    
    state start begin
        when login begin
            local result = function_example.my_function(10, 20)
            chat("Result: "..result)  -- 30
        end
    end
end
```

### Practical Function Examples

```lua
quest shop_system begin
    -- Calculate cost based on empire
    function GetCost(base_cost)
        if pc.empire ~= npc.empire then
            return base_cost * 3  -- Foreign tax
        end
        
        if pc.get_guild() == npc.get_guild() then
            return base_cost * 0.9  -- Guild discount
        end
        
        return base_cost
    end
    
    -- Check if can afford
    function CanAfford(item_cost)
        return pc.get_gold() >= item_cost
    end
    
    state start begin
        when 9006.click begin
            local cost = shop_system.GetCost(10000)
            say("Item costs: "..cost.." Yang")
            
            if shop_system.CanAfford(cost) then
                if select("Buy", "Cancel") == 1 then
                    pc.change_gold(-cost)
                    pc.give_item2(30001, 1)
                end
            else
                say("Not enough Yang!")
            end
        end
    end
end
```

---

## Table-Based Programming

### Simple Tables

```lua
-- Array-style table
local items = {30001, 30002, 30003}

-- Access by index (1-based!)
local first = items[1]  -- 30001

-- Iterate
for i, vnum in ipairs(items) do
    pc.give_item2(vnum, 1)
end
```

### Multi-Dimensional Tables

```lua
-- Table of tables
local shop_items = {
    {"Sword", 30001, 100000},
    {"Armor", 11209, 500000},
    {"Helmet", 12209, 250000}
}

-- Access nested data
local sword_price = shop_items[1][3]  -- 100000

-- Iterate
for i, item_data in ipairs(shop_items) do
    local name = item_data[1]
    local vnum = item_data[2]
    local price = item_data[3]
    
    say(name.." costs "..price.." Yang")
end
```

### Complete Shop Example

```lua
quest advanced_shop begin
    state start begin
        when 9006.click begin
            say_title("Item Shop:")
            say("")
            
            -- Item database
            local items = {
                {"Beginner Sword", 30001, 10000},
                {"Steel Armor", 11209, 50000},
                {"Iron Helmet", 12209, 25000},
                {"Health Potion", 27001, 1000},
                {"Mana Potion", 27002, 1000}
            }
            
            -- Build menu
            local menu = {}
            for i, data in ipairs(items) do
                local name = data[1]
                local price = data[3]
                table.insert(menu, name.." - "..price.." Yang")
            end
            table.insert(menu, "Exit")
            
            -- Show menu
            local s = select_table(menu, "")
            
            if s == #menu then
                return  -- Exit selected
            end
            
            -- Get selected item
            local selected = items[s]
            local item_name = selected[1]
            local item_vnum = selected[2]
            local item_price = selected[3]
            
            -- Purchase confirmation
            say_title("Purchase:")
            say("")
            say_item(item_name, item_vnum, 1)
            say("Price: "..item_price.." Yang")
            say("")
            
            if select("Buy", "Cancel") == 1 then
                if pc.get_gold() >= item_price then
                    pc.change_gold(-item_price)
                    pc.give_item2(item_vnum, 1)
                    say_reward("Purchase complete!")
                else
                    say_reward("Not enough Yang!")
                end
            end
        end
    end
end
```

---

## Complex Quest Patterns

### Daily Quest Pattern

```lua
quest daily_quest_pattern begin
    state start begin
        -- Reset on login if new day
        when login begin
            local today = os.date("%Y%m%d")
            local last_day = pc.getqf("last_login_day")
            
            if tonumber(today) ~= last_day then
                -- New day - reset daily quests
                pc.setqf("daily_kills", 0)
                pc.setqf("daily_complete", 0)
                pc.setqf("last_login_day", tonumber(today))
                syschat("Daily quests reset!")
            end
        end
        
        -- Count progress
        when kill begin
            local complete = pc.getqf("daily_complete")
            
            if complete == 0 then
                local kills = pc.getqf("daily_kills") + 1
                pc.setqf("daily_kills", kills)
                
                if kills % 10 == 0 then
                    syschat("Daily progress: "..kills.."/100")
                end
                
                if kills >= 100 then
                    syschat("Daily quest complete!")
                end
            end
        end
        
        -- Claim reward
        when 9006.click begin
            local kills = pc.getqf("daily_kills")
            local complete = pc.getqf("daily_complete")
            
            say_title("Daily Quest:")
            say("")
            say("Progress: "..kills.."/100 monsters")
            say("")
            
            if complete == 1 then
                say("Quest already completed today!")
                say("Come back tomorrow!")
            elseif kills >= 100 then
                say_reward("Reward: 1,000,000 Yang")
                
                if select("Claim", "Later") == 1 then
                    pc.change_gold(1000000)
                    pc.setqf("daily_complete", 1)
                    say_reward("Reward claimed!")
                end
            else
                say("Kill "..(100 - kills).." more monsters!")
            end
        end
    end
end
```

### Cooldown Pattern

```lua
quest cooldown_pattern begin
    state start begin
        when 9006.click begin
            local current_time = get_time()
            local last_use = pc.getqf("last_use_time")
            local cooldown = 3600  -- 1 hour in seconds
            
            if current_time - last_use < cooldown then
                local remaining = cooldown - (current_time - last_use)
                local minutes = math.floor(remaining / 60)
                local seconds = remaining % 60
                
                say("Cooldown remaining:")
                say(minutes.." minutes, "..seconds.." seconds")
                return
            end
            
            -- Execute quest
            say("Quest available!")
            
            if select("Start", "Cancel") == 1 then
                pc.give_item2(30001, 1)
                pc.setqf("last_use_time", current_time)
                say_reward("Reward given! Come back in 1 hour.")
            end
        end
    end
end
```

### Progressive Difficulty Pattern

```lua
quest progressive_difficulty begin
    state start begin
        when 9006.click begin
            local stage = pc.getqf("quest_stage")
            
            if stage == 0 then
                say("Stage 1: Kill 10 monsters")
                set_state(stage_1)
            elseif stage == 1 then
                say("Stage 2: Kill 50 monsters")
                set_state(stage_2)
            elseif stage == 2 then
                say("Stage 3: Kill 100 monsters")
                set_state(stage_3)
            else
                say("All stages complete!")
            end
        end
    end
    
    state stage_1 begin
        when kill begin
            local kills = pc.getqf("stage_1_kills") + 1
            pc.setqf("stage_1_kills", kills)
            
            if kills >= 10 then
                pc.give_item2(30001, 1)
                pc.setqf("quest_stage", 1)
                notice("Stage 1 complete!")
                set_state(start)
            end
        end
    end
    
    state stage_2 begin
        when kill begin
            local kills = pc.getqf("stage_2_kills") + 1
            pc.setqf("stage_2_kills", kills)
            
            if kills >= 50 then
                pc.give_item2(30002, 1)
                pc.setqf("quest_stage", 2)
                notice("Stage 2 complete!")
                set_state(start)
            end
        end
    end
    
    state stage_3 begin
        when kill begin
            local kills = pc.getqf("stage_3_kills") + 1
            pc.setqf("stage_3_kills", kills)
            
            if kills >= 100 then
                pc.give_item2(30003, 1)
                pc.setqf("quest_stage", 3)
                notice("All stages complete!")
                set_state(__COMPLETE__)
            end
        end
    end
    
    state __COMPLETE__ begin
        when 9006.click begin
            say("Quest complete! Thank you!")
        end
    end
end
```
