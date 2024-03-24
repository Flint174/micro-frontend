import { Card, CardContent, Typography } from "@mui/material";

import { useStore } from "cards/src/store";

import { CARD_DEFAULT } from "./constants";

import { CardsProps, Profile } from "./types";

function Cards({ id }: CardsProps) {
  const {
    state: { country, email, name },
  } = useStore<Profile>(`profiles/${id}`, { ...CARD_DEFAULT, id });

  return (
    <Card>
      <CardContent>
        <Typography>Name: {name}</Typography>
        <Typography>Country: {country}</Typography>
        <Typography>Email: {email}</Typography>
      </CardContent>
    </Card>
  );
}

export default Cards;
