---
sidebar_position: 2
---

# Getting Started

## Quick Start Guide

### 1. Basic Quest Template

```lua
quest my_first_quest begin
    state start begin
        when login begin
            chat("Welcome to the server!")
        end
    end
end
```

### 2. Quest File Location

Place quest files in: `/path/to/server/quest/`

### 3. Activating Quests

- **Manual Reload** - Restart game server
- **Hot Reload** - Use quest reload command (if available)

### 4. Testing

1. Place quest file in quest folder
2. Restart server
3. Login to test character
4. Observe chat message

---

## File Structure & Conventions

### Naming Conventions

**Quest Names:**
- Use descriptive names: `daily_monster_reward.quest`
- Avoid spaces: Use underscore `_` instead
- Lowercase preferred: `teleporter.lua` not `Teleporter.lua`

**Variable Names:**
- Local variables: `local my_variable = 10`
- Quest flags: `pc.setqf("descriptive_flag_name", value)`
- Use meaningful names: `monster_kills` not `mk`

### File Organization

```
quest/
├── daily/
│   ├── daily_monster_reward.quest
│   ├── daily_metin_reward.quest
│   └── daily_item_collect.quest
├── npcs/
│   ├── teleporter.lua
│   ├── warehouse.lua
│   └── fisher.lua
├── events/
│   ├── ox_event.lua
│   └── wedding_event.lua
└── dungeons/
    ├── spider_dungeon.quest
    └── demon_tower.quest
```

### Code Style

```lua
-- Good: Well-formatted, readable
quest example begin
    state start begin
        when 9006.click begin
            say_title("NPC Name:")
            say("")
            say("Welcome, "..pc.get_name().."!")
            
            local level = pc.get_level()
            if level >= 50 then
                say_reward("You are high level!")
            end
        end
    end
end

-- Bad: Poor formatting, hard to read
quest example begin
state start begin
when 9006.click begin
say_title("NPC Name:")
say("Welcome, "..pc.get_name().."!")
local level=pc.get_level()
if level>=50 then say_reward("You are high level!") end
end
end
end
```

---

## Your First Quest

Let's create a complete beginner quest step-by-step.

### Goal
Create an NPC that gives a reward when clicked.

### Step 1: Create the File

File: `quest/beginner_reward.quest`

```lua
quest beginner_reward begin
    state start begin
        when 9006.click begin
            -- This triggers when player clicks NPC 9006
            say_title("Friendly NPC:")
            say("")
            say("Hello, "..pc.get_name().."!")
            say("Welcome to our server!")
            say("")
            
            -- Give reward
            local s = select("Accept Reward", "No Thanks")
            
            if s == 1 then
                pc.give_item2(30001, 1)  -- Give sword
                pc.change_gold(100000)    -- Give 100k yang
                chat("You received a beginner reward!")
            else
                say("Come back when you're ready!")
            end
        end
    end
end
```

### Step 2: Understanding the Code

```lua
quest beginner_reward begin          -- Quest name must match filename
    state start begin                 -- Every quest starts in "start" state
        when 9006.click begin         -- Event: clicking NPC 9006
            say_title("Friendly NPC:") -- Dialog window title
            say("")                    -- Empty line for spacing
            say("Hello, "..pc.get_name().."!") -- Text with player name
            
            local s = select("Accept Reward", "No Thanks")
            -- Creates a selection menu, returns 1 or 2
            
            if s == 1 then            -- If first option selected
                pc.give_item2(30001, 1) -- Give item vnum 30001, count 1
                pc.change_gold(100000)  -- Add 100,000 yang
                chat("You received a beginner reward!")
            end
        end
    end
end
```

### Step 3: Testing

1. Save file as `beginner_reward.quest`
2. Place in server's quest folder
3. Restart server
4. Find NPC 9006 in game
5. Click NPC
6. Test both options

### Step 4: Improving the Quest

Add persistence so reward is only given once:

```lua
quest beginner_reward begin
    state start begin
        when 9006.click begin
            -- Check if already received
            if pc.getqf("received_reward") == 1 then
                say_title("Friendly NPC:")
                say("You already received your reward!")
                return
            end
            
            say_title("Friendly NPC:")
            say("")
            say("Hello, "..pc.get_name().."!")
            say("Welcome to our server!")
            say("")
            
            local s = select("Accept Reward", "No Thanks")
            
            if s == 1 then
                pc.give_item2(30001, 1)
                pc.change_gold(100000)
                pc.setqf("received_reward", 1)  -- Mark as received
                chat("You received a beginner reward!")
            end
        end
    end
end
```

**Congratulations!** You've created your first persistent quest.
