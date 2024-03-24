import React, { useCallback, useEffect, useState } from 'react'
import { MEDIA_TYPES } from '../../../const/constConfig'
import contentApi from '../../../api/requests/contentRequest'
import { toast } from 'react-toastify'
import { Box, Button, TextField, useTheme } from '@mui/material'
import CustomTitle from '../../../components/common/CustomTitle/CustomTitle'
import { themeState } from '../../../styles/theme'
import ListMedias from '../../../components/common/ListMedias/ListMedias'
import YearSlider from '../../../components/common/YearSlider/YearSlider'
import PeopleGrid from '../../../components/common/People/PeopleGrid/PeopleGrid'
let timer;
const delay = 1000

const ContentSearch = () => {
  const theme = useTheme()
  const [query, setQuery] = useState('')
  const [mediaType, setMediaType] = useState(MEDIA_TYPES[2])
  const [contents, setContents] = useState([])
  const [page, setPage] = useState(1)
  const [selectedYears, setSelectedYears] = useState([1900, new Date().getFullYear()]);
  const [genres, setGenres] = useState([])

  useEffect(() => {
    setContents([])
    setPage(1)
  }, [mediaType])


  const handleCategoryChange = (category) => {
    setMediaType(category)
    setContents([])
    setQuery('')
    setSelectedYears([1900, new Date().getFullYear()])
    setPage(1)


  }

  const handleYearChange = (years) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      console.log('Вибрані роки:', years);
      setSelectedYears(years)
    }, delay);


  };
  const handleChangeQuery = (event) => {
    const updatedQuery = event.target.value
    clearTimeout(timer);
    timer = setTimeout(() => {
      setQuery(updatedQuery);
    }, delay);

  }

  const search = useCallback(async () => {
    const { response, err } = await contentApi.search({
      type: mediaType,
      query,
      page

    })

    if (err) {
      toast.error(err.message)
    }
    if (response) {
      if (page !== 1) {
        setContents(prevContent => [...prevContent, ...response.results])
      }
      else {
        setContents(response.results)
      }
    }
  }, [mediaType, query, page])

  useEffect(() => {
    if (query.trim().length !== 0) {
      search()
    } else {
      setContents([])
      setPage(1)
    }
  }, [query, search, mediaType, page])

  return (
    <Box
      sx={{
        margin: '70px 20px',
        color: 'primary.text',

      }}>
      <CustomTitle title='Search' />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'end',
          gap: '2rem',

        }}>
        {MEDIA_TYPES.map((item, index) => (
          <Button
            key={index}
            variant='contained'
            sx={{
              backgroundColor: `${mediaType === item ? "#aa5656" : `${theme.palette.mode === themeState.light ? '' : '#225792'}`}`
            }}
            onClick={() => handleCategoryChange(item)}>
            {item}
          </Button>
        ))}


      </Box>
      {mediaType === 'people' ?
        (
          <>
            <Box
              sx={{
                color: 'primary.text',
                backgroundColor: 'background.default',
                padding: '1rem',
                marginTop: '1rem',
                borderRadius: '1rem'
              }}>
              <TextField
                fullWidth
                placeholder='Search people'
                autoFocus
                onChange={handleChangeQuery} />
            </Box>
            <PeopleGrid contents={contents} type={mediaType} />
            {contents.length > 0 && (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center'
              }}>
              <Button
                variant="outlined"
                sx={{
                  marginTop: '1rem',

                }}
                onClick={() => setPage(page + 1)}
              >
                Show more
              </Button>
            </Box>
          )}
          </>
        )
        :
        (<>
          <Box
            sx={{
              color: 'primary.text',
              backgroundColor: 'background.default',
              padding: '1rem',
              marginTop: '1rem',
              borderRadius: '1rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '2rem',
            }}>
            <TextField
              fullWidth
              placeholder={`Search ${mediaType}`}
              autoFocus
              onChange={handleChangeQuery} />
            <YearSlider onChange={handleYearChange} />
          </Box>

          <ListMedias contents={contents.filter((item, index) => {
            const release = mediaType === 'movie' ? item.release_date.split('-')[0] : item.first_air_date.split('-')[0]

            if (
              Number(release) >= selectedYears[0] &&
              selectedYears[1] >= Number(release) &&
              item.poster_path !== null &&
              item.backdrop_path !== null &&
              item.mediaPoster !== null) {
              return true
            } else {
              return false
            }
          })} type={mediaType} />
          {contents.length > 0 && (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center'
              }}>
              <Button
                variant="outlined"
                sx={{
                  marginTop: '1rem',

                }}
                onClick={() => setPage(page + 1)}
              >
                Show more
              </Button>
            </Box>
          )}



        </>)}
    </Box>
  )
}

export default ContentSearch