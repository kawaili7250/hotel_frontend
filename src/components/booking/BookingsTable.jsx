import React, { useEffect, useState } from 'react'
import { format, parseISO } from 'date-fns'
import DateSlider from '../common/DateSlider.jsx'

const BookingsTable = ({bookingInfo, handleBookingCancellation}) => {
  const [filteredBookings, setFilteredBookings] = useState(bookingInfo)
  const filterBookings = (startDate, endDate) => {
    let filtered = bookingInfo
    if (startDate && endDate) {
      filtered = bookingInfo.filter((booking) => {
        //console.log("checkInDate:", booking.checkInDate, "type:", typeof booking.checkInDate);
        //const bookingStartDate = parseISO(booking.checkInDate)
        //const bookingEndDate = parseISO(booking.checkOutDate)
        if (!booking.checkInDate || !booking.checkOutDate) return false;

        const bookingStartDate = Array.isArray(booking.checkInDate)
        ? new Date(booking.checkInDate[0], booking.checkInDate[1] - 1, booking.checkInDate[2])
        : new Date(booking.checkInDate);

        const bookingEndDate = Array.isArray(booking.checkOutDate)
        ? new Date(booking.checkOutDate[0], booking.checkOutDate[1] - 1, booking.checkOutDate[2])
        : new Date(booking.checkOutDate);
        
        return bookingStartDate >= startDate && bookingEndDate <= endDate && bookingEndDate > startDate
      })
    }
    setFilteredBookings(filtered)
  }

  useEffect(() => {
    setFilteredBookings(bookingInfo)
  }, [bookingInfo])

  return (
    <section className='p-4'>
      <DateSlider onDateChange={filterBookings} onFilterChange={filterBookings}/>
      <table className="table table-bordered table-hover shadow">
        <thead>
          <tr>
            <th>S/N</th>
            <th>Booking ID</th>
            <th>Room ID</th>
            <th>Room Type</th>
            <th>Check-In Date</th>
            <th>Check-Out Date</th>
            <th>Guest Name</th>
            <th>Email</th>
            <th>Adults</th>
            <th>Children</th>
            <th>Total Guest</th>
            <th>Confirmation Code</th>
            <th colSpan={2}>Actions</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {filteredBookings.map((booking, index) => (
            <tr key={booking.id}>
            <td>{index + 1}</td>
            <td>{booking.id}</td>
            <td>{booking.room.id}</td>
            <td>{booking.room.roomType}</td>
            <td>{format(booking.checkInDate, 'dd MMM yyyy')}</td>
            <td>{format(booking.checkOutDate, 'dd MMM yyyy')}</td>
            <td>{booking.guestFullName}</td>
            <td>{booking.guestEmail}</td>
            <td>{booking.numOfAdults}</td>
            <td>{booking.numOfChilds}</td>
            <td>{booking.totalNumGuest}</td>
            <td>{booking.bookingConfirmationCode}</td>
            <td>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => handleBookingCancellation(booking.id)}>
                Cancel
              </button>
            </td>
          </tr>
          ))}
        </tbody>
      </table>
      {filteredBookings.length === 0 && <p>No booking result found for the selected date</p>}
    </section>
  )
}

export default BookingsTable
