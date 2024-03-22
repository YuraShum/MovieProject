import React, { useEffect,  useState } from 'react'
import { useParams } from 'react-router-dom'

import { useDispatch } from 'react-redux'
import { setAppState } from '../../../redux/features/appState/appStateSlice'
import { setIsLoading } from '../../../redux/features/selectIsLoading/selectIsLoadingSlice'
import contentApi from '../../../api/requests/contentRequest'
import { toast } from 'react-toastify'
import { current } from '@reduxjs/toolkit'
import { Box, Button } from '@mui/material'
import { useTheme } from '@emotion/react'
import { themeState } from '../../../styles/theme'
import CustomTitle from '../../../components/common/CustomTitle/CustomTitle'
import { TYPE } from '../../../const/constConfig'
import ListMedias from '../../../components/common/ListMedias/ListMedias'


const ContentList = () => {
  const dispatch = useDispatch()
  const theme = useTheme()
  const categorys = ['popular', 'top_rated']

  const { type } = useParams()
  const [contents, setContents] = useState([])
  const [category, setCategory] = useState(0)
  const [page, setPage] = useState(1)



  useEffect(() => {
    dispatch(setAppState(type))
    window.scrollTo(0, 0)
    // console.log("Type", type)
  }, [dispatch, type])

  useEffect(() => {
    const getContent = async () => {
      if (page === 1) {
        dispatch(setIsLoading(true))
      }
      const { response, err } = await contentApi.getContentList({
        type,
        category: categorys[category],
        page
      })
      // console.log('response Contents: ', response)
      dispatch(setIsLoading(false))

      if (err) {
        toast.error(err.message)
      }
      if (response) {
        if (page !== 1) {
          setContents(prevContent => [...prevContent, ...response.results])
        }
        else {
          setContents([...response.results])
        }
      }



    }
    getContent()
  }, [dispatch, type, category,  page])

  const showMore = () => {
    setPage(page + 1)
  }

  const handleChaneCategory = (index) => {
    if (category !== index) {
      setContents([])
      setCategory(index)
      setPage(1)
    }

  }


  return (
    <>
      <Box sx={{
        margin: '70px 20px 20px',
        color: 'primary.text',

      }}>
        <Box sx={{
          paddingTop: '2rem'
        }}>
          <CustomTitle title={`${type === TYPE.movie ? 'Movies ' : 'TV '} ${categorys[category].replace('_', " ")}`} />
        </Box>
        <Box sx={{
          marginTop: '2rem',
          padding: '1rem',
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          gap: '2rem',


        }}>
          {categorys.map((elem, index) => (
            <Button
              key={index}
              variant='contained'
              sx={{
                backgroundColor: `${category === index ? "#aa5656" : `${theme.palette.mode === themeState.light ? '' : '#225792'}`}`
              }}
              onClick={() => handleChaneCategory(index)}>
              {elem.replace('_', ' ')}
            </Button>
          ))}
        </Box>
        {/** content grid section */}
        <ListMedias contents={contents} type={type} />
        {/** content grid section */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center'
          }}>
          <Button

            variant="outlined"
            sx={{

              marginTop: '1rem'
            }}
            onClick={showMore}>
            Show more
          </Button>
        </Box>
      </Box>
    </>
  )
}

export default ContentList