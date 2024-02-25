import React from 'react'
import CircularRate from '../../components/common/Form/CircularRate/CircularRate'
import TitleBanerSection from '../../components/common/TitleBanerSection/TitleBanerSection'
import { TYPE, CATEGORY } from '../../const/constConfig'
const Home = () => {
  return (
    <>
      <TitleBanerSection type={TYPE.movie} category={CATEGORY.popular} />
    </>
  )
}

export default Home