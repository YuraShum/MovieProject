import React, { useEffect, useState } from 'react'
import CircularRate from '../../components/common/Form/CircularRate/CircularRate'
import TitleBanerSection from '../../components/common/TitleBanerSection/TitleBanerSection'
import { TYPE, CATEGORY, FILTER_BUTTON } from '../../const/constConfig'
import ContentSlide from '../../components/common/ContentSlide/ContentSlide'
import { Box, Button, Container, Stack } from '@mui/material'
import { useTheme } from '@emotion/react'
import { themeState } from '../../styles/theme'

const Home = () => {
  const [filterContent, setFilterContent] = useState(FILTER_BUTTON[0])
  const theme = useTheme()
  // useEffect(() => {
  //   console.log(filterContent)
  // }, [filterContent])
  return (
    <>
      <TitleBanerSection type={TYPE.movie} category={CATEGORY.popular} />
      <Box
        sx={{
          padding: '1rem',
          width: '100%',
          backgroundColor: `${theme.palette.mode === themeState.light ? '#ececec' : '#282828'}`
        }}>
        <Stack
          sx={{
            display: 'flex',
            flexDirection: 'row',
            marginRight: '2rem',
            gap: '1rem',
            flexWrap: 'wrap',
            justifyContent: 'end',
            alignItems: 'center'

          }}>
          {FILTER_BUTTON.map(button => {
            return (
              <Button
                variant='contained'
                key={button}
                sx={{
                  backgroundColor: `${filterContent === button ? "#aa5656" : `${theme.palette.mode === themeState.light ? '' : '#225792'}`}`


                }}
                onClick={() => setFilterContent(button)}>
                {button}
              </Button>
            )
          })}
        </Stack>
      </Box>

      <Box sx={{
        color: 'primary.text'
      }}>
      {filterContent === FILTER_BUTTON[0] ?
        <Stack spacing={2}>
          <ContentSlide type={TYPE.movie} category={CATEGORY.popular} title={FILTER_BUTTON[1]} />
          <ContentSlide type={TYPE.tv} category={CATEGORY.popular} title={FILTER_BUTTON[2]} />
          <ContentSlide type={TYPE.movie} category={CATEGORY.top_rated} title={FILTER_BUTTON[3]} />
          <ContentSlide type={TYPE.tv} category={CATEGORY.top_rated} title={FILTER_BUTTON[4]} />
        </Stack> :
        filterContent === FILTER_BUTTON[1] ?
          <ContentSlide type={TYPE.movie} category={CATEGORY.popular} title={FILTER_BUTTON[1]} /> :
          filterContent === FILTER_BUTTON[2] ?
            <ContentSlide type={TYPE.tv} category={CATEGORY.popular} title={FILTER_BUTTON[2]} /> :
            filterContent === FILTER_BUTTON[3] ?
              <ContentSlide type={TYPE.movie} category={CATEGORY.top_rated} title={FILTER_BUTTON[3]} /> :
              <ContentSlide type={TYPE.tv} category={CATEGORY.top_rated} title={FILTER_BUTTON[4]} />
      }
      </Box>
    </>
  )
}

export default Home