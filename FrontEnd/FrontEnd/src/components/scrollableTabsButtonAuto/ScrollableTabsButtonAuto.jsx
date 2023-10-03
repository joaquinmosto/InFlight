import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { Avatar, useMediaQuery } from "@mui/material";

export default function ScrollableTabsButtonAuto({
  categories,
  handleCategoryButton, setStartIndex
}) {
  const [value, setValue] = React.useState(0);
  
  const isMobile = useMediaQuery('(max-width:550px)');

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setStartIndex(0);
  };
  return (
    <Box sx={{ width: "100%", display: "flex", justifyContent: "center", borderRadius: "120% 10% 10% 0%"}}>
      <Tabs
        textColor="secondary"
        indicatorColor="secondary"
        sx={{ display: "flex", justifyContent: "space-evenly", borderRadius: "10px 10px 10px 10px"}}
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons
        allowScrollButtonsMobile
        aria-label="scrollable force tabs example"
      >
        <Tab
              sx={{padding: isMobile ? '5px 15px' :'10px 30px'}}
              icon={
                <Avatar
                sx={{ width: isMobile ? 70 : 90, 
                  height: isMobile ? 70 : 90}}
                  alt="logo"
                  src='./logoblanco.png'
                />
              }

          value={0}
          label="TODOS"
          onClick={() => handleCategoryButton({nombre:"TODOS", reservable: true})}
        />
        {categories?.map((item) => {
          return (
            <Tab
              sx={{padding: isMobile ? '5px 15px' :'10px 30px'}}
              icon={
                <Avatar
                  sx={{ width: isMobile ? 70 : 90, 
                    height: isMobile ? 70 : 90}}
                  alt={item.nombre}
                  src={item.image}
                 
                />
              }
              key={item.id}
              label={item.nombre}
              value={item.id}
              onClick={() => handleCategoryButton(item)}
            />
          );
        })}
      </Tabs>
    </Box>
  );
}
