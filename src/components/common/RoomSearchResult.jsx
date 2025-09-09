import React, { useState } from 'react'
import { Button, Row } from 'react-bootstrap'
import RoomCard from '../room/RoomCard'
import RoomPaginator from './RoomPaginator'

const RoomSearchResult = ({results, onClearSearch}) => {
  const [currentPage, setCurrentPage] = useState(1)
  const resultPerPage = 5
  const totalResults = results.length
  const totalPages = Math.ceil(totalResults / resultPerPage)

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  const startIdx = (currentPage - 1) * resultPerPage
  const endIdx = startIdx + resultPerPage
  const paginatedResult = results.slice(startIdx, endIdx)

  return (
    <>
      {results.length > 0 ? (
        <>
          <h5 className="text-center mt-5">Search Result</h5>
          <Row>
            {paginatedResult.map((room) => (
              <RoomCard key={room.id} room={room}/>
            ))}
          </Row>
          <Row>
            {totalResults > resultPerPage && (
              <RoomPaginator 
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}/>
            )}
            <Button
            variant="secondary" onClick={onClearSearch}>
            Clear Search
            </Button>
          </Row>
        </>
      ):(
        <p></p>
      )}      
    </>
  )
}

export default RoomSearchResult
