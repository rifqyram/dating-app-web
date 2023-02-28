import {Fragment, useEffect, useState} from "react";
import axiosInstance from "../../api/axiosInstance";
import {
    Avatar,
    Box,
    CardActionArea,
    Container,
    Divider, Grid,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Typography
} from "@mui/material";
import {getAllMatchPartner} from "../../services/partner.service";
import {downloadProfilePicture} from "../../services/memberPersonalInfo.service";

export default function ListPartner() {
    const [partners, setPartners] = useState([]);

    async function fetchMyMatches() {
        try {
            const {data} = await getAllMatchPartner();
            const partners = await Promise.all(data.map(async partner => {
                const blob = await downloadProfilePicture(partner.profilePicture);
                return {...partner, profilePicture: URL.createObjectURL(blob)}
            }));
            setPartners(partners);
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        fetchMyMatches()
    }, []);

    return (
        <>
            <Box bgcolor='#1A120B'>
                <Container maxWidth='xs'
                           sx={{
                               bgcolor: 'white',
                               padding: {xs: 0, md: 0, lg: 0},
                               minHeight: '100vh'
                           }}>
                    <List>
                        {partners.length > 0 ? partners.map((partner, idx) => (
                            <Fragment key={idx}>
                                <CardActionArea>
                                    <ListItem>
                                        <ListItemAvatar>
                                            <Avatar alt={partner.name}
                                                    src={partner.profilePicture}/>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary="Hi There!"
                                            secondary={
                                                <>
                                                    <Typography
                                                        sx={{display: 'inline'}}
                                                        component="span"
                                                        variant="body2"
                                                        color="text.primary"
                                                    >
                                                        {partner.name}
                                                    </Typography>
                                                    {` — ${partner.selfDescription}`}
                                                </>
                                            }
                                        />
                                    </ListItem>
                                </CardActionArea>
                                <Divider variant="inset" component="li"/>
                            </Fragment>
                        )) : (
                            <Grid container justifyContent='center' alignItems='center' minHeight='100vh'>
                                <Typography variant='h5' fontWeight='bold'>No Partner Match</Typography>
                            </Grid>
                        )}
                    </List>
                </Container>
            </Box>
        </>
    )
        ;
}