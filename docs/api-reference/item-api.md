---
sidebar_position: 3
---

# Item API (item.*)

## Item Information

```lua
-- Basic Info
item.get_vnum()         -- Returns: Number - Item vnum
item.get_name()         -- Returns: String - Item name
item.get_count()        -- Returns: Number - Item count/stack

-- Sockets & Values
item.get_socket(index)  -- Returns: Number - Socket value (0-2)
item.get_value(index)   -- Returns: Number - Item value (0-5)

-- Location
item.get_cell()         -- Returns: Number - Inventory cell/slot
item.get_id()           -- Returns: Number - Unique item ID

-- Example (Fishing Rod)
when 9009.take with item.vnum >= 27400 and item.vnum < 27590 begin
    local points = item.get_socket(0)
    local max_points = item.get_value(2)
    
    if points == max_points then
        say("Your rod is ready to upgrade!")
    else
        say("Your rod needs more points.")
    end
end
```

## Item Actions

```lua
-- Remove Item
item.remove()           -- Remove the item (in take/use event)

-- Selection
item.select(item_id)        -- Select item by ID
item.select_cell(cell)      -- Select item by cell

-- Example
when 9006.take begin
    local vnum = item.get_vnum()
    
    if vnum == 30001 then
        say("Thanks for the sword!")
        item.remove()  -- Remove from inventory
    else
        say("I don't want that item.")
    end
end
```

## Item Name Lookup

```lua
-- Get item name by vnum
item_name(vnum)         -- Returns: String - Item name

-- Example
local sword_name = item_name(30001)
say("You need: "..sword_name)
```
