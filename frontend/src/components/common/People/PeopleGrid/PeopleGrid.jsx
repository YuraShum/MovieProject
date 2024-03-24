import { Grid } from "@mui/material"
import PeopleItem from "../PeopleItem/PeopleItem"


const PeopleGrid = ({ contents, type }) => {

    return (
        <Grid container spacing={1} >
            {contents.filter(content => content.profile_path !== null).sort((a, b) => {
        const popularityA = parseFloat(a.popularity);
        const popularityB = parseFloat(b.popularity);
        return popularityB - popularityA; 
    }).map((content, index) => (
                <Grid item xs={6} sm={4} md={3} lg={2} key={index}>
                    <PeopleItem content={content} type={type} />
                </Grid>
            ))}
        </Grid>
    )
}

export default PeopleGrid