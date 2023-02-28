import {Box, Button, CardActionArea, CardActions, CardContent, Container, Grid, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import {choosePartner, getPartner} from "../../services/partner.service";
import {downloadProfilePicture} from "../../services/memberPersonalInfo.service";
import moment from "moment";
import RouteNavigation from "../../routes/routeNavigation";
import {useNotification} from "../../context/notificationContext";

export default function Partner() {
    const {navigateTo} = RouteNavigation();
    const [currentPage, setCurrentPage] = useState(1);
    const [pagination, setPagination] = useState({
        partners: [],
        totalPages: 0,
        totalElement: 0
    });
    const {handleNotification} = useNotification();

    async function matchPartner(partner) {
        try {
            const partnerRequest = {partnerId: partner.memberId}
            await choosePartner(partnerRequest);

            setCurrentPage(currentPage + 1);

            handleNotification({
                message: 'Match Partner Success',
                severity: 'success',
            })
        } catch (e) {
            handleNotification({
                message: 'You already match this partner',
                severity: 'error',
            })
        }
    }

    function onNextPage() {
        if (currentPage !== pagination.totalPages) setCurrentPage(currentPage + 1)
    }

    async function fetchPartner() {
        try {
            const {data} = await getPartner({page: currentPage, size: 1})
            const partners = await Promise.all(data.content.map(async p => {
                    const blob = await downloadProfilePicture(p.profilePicture)
                    return {...p, profilePicture: URL.createObjectURL(blob)}
                })
            );
            setPagination({
                partners: partners,
                totalPages: data.totalPages,
                totalElement: data.totalElement,
            })
        } catch (e) {
            if (e.response.status === 404) {
                handleNotification({
                    message: 'You have to field this form info before you find partner',
                    severity: 'info',
                });
                navigateTo('/setup');
            }
        }
    }


    useEffect(() => {
        fetchPartner();
    }, [currentPage]);

    return (
        <Box bgcolor='#1A120B'>
            <Container maxWidth='xs'
                       sx={{
                           bgcolor: 'white',
                           padding: {xs: 0, md: 0, lg: 0},
                           minHeight: '100vh'
                       }}>
                {pagination.partners.length !== 0 ? pagination.partners.map((partner, idx) =>
                    (
                        <Box key={idx}>
                            <CardActionArea
                                sx={{
                                    bgcolor: 'rgba(0, 0, 0, 0.85)',
                                    borderBottomLeftRadius: 8,
                                    borderBottomRightRadius: 8
                                }}>
                                <img className='image-card' src={partner.profilePicture} alt='profile'/>
                            </CardActionArea>
                            <CardContent>
                                <Typography variant='h5' component='div'>
                                    {partner.name} - {moment().diff(partner.bod, 'years')} y.o
                                </Typography>
                                <Typography variant='p'>
                                    {partner.selfDescription}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button onClick={e => matchPartner(partner)} variant='outlined'>Like</Button>
                                <Button onClick={onNextPage} variant='contained'>Next</Button>
                            </CardActions>
                        </Box>
                    )) : (
                    <>
                        <Grid container justifyContent='center' alignItems='center' minHeight='100vh'>
                            <Typography variant='h5' fontWeight='bold'>No Partner Available</Typography>
                        </Grid>
                    </>
                )}
            </Container>
        </Box>
    )
}