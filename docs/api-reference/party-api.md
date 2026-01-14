---
sidebar_position: 6
---

# Party API (party.*)

## Party Status

```lua
-- Party Checks
party.is_party()            -- Returns: Boolean - In party?
party.is_leader()           -- Returns: Boolean - Is party leader?

-- Party Size
party.get_member_count()    -- Returns: Number - Party size
party.get_near_count()      -- Returns: Number - Members nearby

-- Example
when kill begin
    if party.is_party() then
        local members = party.get_member_count()
        chat("Party kill! Members: "..members)
    end
end
```

## Party Events

```lua
-- Cinematic
party.run_cinematic(name)   -- Play cinematic for party

-- Example
when 9006.click with party.is_party() and party.is_leader() begin
    say("Start dungeon for party?")
    if select("Yes", "No") == 1 then
        party.run_cinematic("dungeon_intro")
    end
end
```
