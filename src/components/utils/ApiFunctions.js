import axios from "axios"

export const api = axios.create({
    /*baseURL: "http://localhost:9192"*/
    baseURL: "https://hotel-backend-5ol9.onrender.com"
})

export const getHeader = () => {
    const token = localStorage.getItem("token")
    if (token) {
      return {
        Authorization : `Bearer ${token}`,
        "Content-Type" : "application/json"
      }
    } else {
        return {
          "Content-Type" : "application/json"
        }
    }
} 

/* This function add a new room to database */
export async function addRoom(photo, roomType, roomPrice) {
    const formData = new FormData();
    formData.append("photo", photo);
    formData.append("roomType", roomType);
    formData.append("roomPrice", roomPrice);

    const response = await api.post("/rooms/add/new-room", formData);
    if (response.status === 201) {
        return true;
    }
    else {
        return false;
    }
}

/* This function gets all room types from database */
export async function getRoomTypes() {
    try {
        const response = await api.get("/rooms/room/types");
        return response.data;
    } catch (error) {
        throw new Error("Error fetching room types");
    }
}

/* This function gets all rooms from database */
export async function getAllRooms() {
    try {
        const result = await api.get("/rooms/all-rooms");
        return result.data;
    } catch(error) {
        throw new Error("Error fetching rooms");
    }
}

/* This function deletes a room by the Id */
export async function deleteRoom(roomId) {
    try {
        const result = await api.delete(`/rooms/delete/room/${roomId}`);
        return result.data;
    } catch(error) {
        throw new Error("Error deleting room ${error.message}");
    }
}

/* this function update a room */
export async function updateRoom(roomId, roomData) {
    const formData = new FormData();
    formData.append("roomType", roomData.roomType);
    formData.append("roomPrice", roomData.roomPrice);
    formData.append("photo", roomData.photo);
    const response = await api.put(`/rooms/update/${roomId}`, formData);

    return response;
}

/* This function gets a room by the id */
export async function getRoomById(roomId) {
    try {
        const result = await api.get(`/rooms/room/${roomId}`);
        return result.data;
    } catch(error) {
        throw new Error(`Error fetching room ${error.message}`);
    }
}

/* This function saves a new booking to the database */
export async function bookRoom(roomId, booking) {
    try {
        const response = await api.post(`/bookings/room/${roomId}/booking`, booking);
        return response.data;
    } catch(error) {
        if(error.response && error.response.data) {
            throw new Error(error.response.data);
        } else {
            throw new Error(`Error booking room: ${error.message}`);
        }
    }
}

/* This function gets all bookings from the database */
export async function getAllBookings() {
    try {
        //const result = await api.get("/bookings/all-bookings");
        const result = await api.get("/bookings/all-bookings", {
          headers : getHeader()
        });
        return result.data;
    } catch(error) {
        throw new Error(`Error fething bookings: ${error.message}`);
    }
}

/* This function get booking by confirmation code */
export async function getBookingByConfirmationCode(confirmationCode) {
    try {
        const result = await api.get(`/bookings/confirmation/${confirmationCode}`, {
            headers: getHeader()
        });
        return result.data;
    } catch(error) {
        if (error.response && error.response.data) {
            throw new Error(error.response.data);
        }
        else {
            throw new Error(`Error find booking: ${error.message}`);
        }
    }
}

/* This function cancels booking */
export async function cancelBooking(bookingId) {
    try {
        const result = await api.delete(`/bookings/booking/${bookingId}/delete`);
        return result.data;
    } catch(error) {
        throw new Error(`Error cancelling booking: ${error.message}`);
    }
}

/* This function gets all available rooms from the database with specified date and room type */
export async function getAvailableRooms(checkInDate, checkOutDate, roomType) {
    const result = await api.get(`rooms/available-rooms?checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&roomType=${roomType}`)
    return result
}

/* */
export async function register(registration) {
    console.log("Base URL:", process.env.REACT_APP_API_URL);
	try {
        const response = await api.post("/auth/register-user", registration)
        return response.data
    } catch(error) {
        if (error.response && error.response.data) {
            throw new Error(error.response.data)
        }
        else {
            throw new Error(`User registration error: ${error.message}`)
        }

    }
}

/* */
export async function login(login) {
    try {
        const response = await api.post("auth/login", login)
        if (response.status >= 200 && response.status < 300) {
            return response.data
        }
        else {
            return null
        }
    } catch(error) {
        console.error(error)
        return null
    }    
}

export async function getUserProfile(userId, token) {
    try {
        const response = await api.get(`users/profile/${userId}`, {
            headers : getHeader()
        })
        return response.data
    } catch(error) {
        throw error
    }
}

export async function deleteUser(userId) {
  try {
    const response = await api.delete(`/users/delete/${userId}`, {
      headers: getHeader()
    })
    return response.data

  } catch(error) {
    return error.message
  }
}

export async function getUser(userId, token) {
    try {
      const response = await api.get(`users/${userId}`, {
        headers: getHeader()
      })
      return response.data

    } catch(error) {
      throw error
    }
}

export async function getBookingsByUserId(userId, token) {
    try {
        const response = await api.get(`/bookings/user/${userId}/bookings`, {
            headers: getHeader()
        })
        return response.data
    } catch(error) {
        console.error("Error fetching bookings", error.message)
        throw new Error("Failed to fetch bookings")
    }
}
