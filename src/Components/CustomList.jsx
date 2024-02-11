import React, { useState } from "react";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AddToQueueIcon from "@mui/icons-material/AddToQueue";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import SchoolIcon from "@mui/icons-material/School";
import HomeIcon from "@mui/icons-material/Home";
import { List } from "@mui/material";

function CustomList({ items, open, gotoSpecific }) {
  const [activeItem, setActiveItem] = useState(null);

  const icons = [
    <HomeIcon />,
    <AddToQueueIcon />,
    <PeopleAltIcon />,
    <SchoolIcon />,
  ];

  const handleItemClick = (text) => {
    setActiveItem(text);
    gotoSpecific(text);
  };

  return (
    <List sx={{ color: "#fb8500" }}>
      {items.map((text, index) => (
        <ListItem key={text} disablePadding sx={{ display: "block" }}>
          <ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: open ? "initial" : "center",
              px: 2.5,
              backgroundColor: activeItem === text ? "#f0f0f0" : "transparent", // Set background color for active item
            }}
            onClick={() => handleItemClick(text)}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : "auto",
                justifyContent: "center",
                color: activeItem === text ? "#000" : "#ff8600",
                my: 1,
              }}
              title={text}
            >
              {icons[index]}
            </ListItemIcon>
            <ListItemText
              primary={text}
              sx={{
                opacity: open ? 1 : 0,
                color: activeItem === text ? "#000" : "#ff8600",
              }}
            />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
}

export default CustomList;
