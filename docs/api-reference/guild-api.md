---
sidebar_position: 4
---

# Guild API (guild.*)

## Guild War

```lua
-- War Status
guild.get_any_war()         -- Returns: Number - War ID (0 if none)

-- Join War
guild.war_enter(war_id)     -- Join guild war

-- Example
when button begin
    local war_id = guild.get_any_war()
    
    if war_id ~= 0 then
        say("Join the guild war?")
        if select("Yes", "No") == 1 then
            guild.war_enter(war_id)
        end
    end
end
```

## Guild Leadership

```lua
-- Change Leader
guild.change_master_with_limit(name, level_limit, time_resign_limit, 
                                time_be_other_leader, time_be_other_member, 
                                is_cache_item)

-- Returns: Number - Status code:
-- 0 = Invalid name
-- 1 = Not guild leader
-- 2 = Member not found
-- 3 = Success
-- 4 = Not in guild
-- 5 = Target offline
-- 6 = Level too low
-- 7 = Target had previous guild

-- Example
local result = guild.change_master_with_limit(new_leader_name, 40, 0, 0, 0, true)
if result == 3 then
    chat("Leadership transferred!")
end
```
