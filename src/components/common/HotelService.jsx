import React from 'react'
import { Card, Col, Container, Row } from 'react-bootstrap'
import Header from './Header'
import { FaBars, FaBeer, FaClock, FaParking, FaPlane, FaShuttleVan, FaTshirt, FaUtensils, FaWifi } from 'react-icons/fa'
import { FaShuttleSpace, FaSnowflake, FaVanShuttle } from 'react-icons/fa6'

const HotelService = () => {
  return (
    <Container className="mb-2">
      <Header title={"Our Services"}/>
      <Row>
        <h4 className="text-center">
          Services at <span className="hotel-color">Demo - </span> Hotel
          <span className="gap-2">
            <FaClock/> - 24-Hour Front Desk
          </span>
        </h4>
      </Row>
      <hr/>
      <Row xs={1} md={2} lg={3} className="g-4 mt-2">
        <Col>
          <Card>
            <Card.Body>
              <Card.Title className="hotel-color">
                <FaWifi/> Wifi
              </Card.Title>
              <Card.Text>Stay connected with high-speed and stable internet access.</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card>
            <Card.Body>
              <Card.Title className="hotel-color">
                <FaUtensils/> Breakfast
              </Card.Title>
              <Card.Text>Start your day with a delicious breakfast buffet.</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card>
            <Card.Body>
              <Card.Title className="hotel-color">
                <FaTshirt/> Laundry
              </Card.Title>
              <Card.Text>Keep your clothes clean and fresh with our laundry service.</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card>
            <Card.Body>
              <Card.Title className="hotel-color">
                <FaBeer/> Min-bar
              </Card.Title>
              <Card.Text>Enjoy a refreshing drink or snack from our in-room mini-bar.</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card>
            <Card.Body>
              <Card.Title className="hotel-color">
                <FaParking/> Parking
              </Card.Title>
              <Card.Text>Free parking provided for our hotel guest. (Booking in advance needed)</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card>
            <Card.Body>
              <Card.Title className="hotel-color">
                <FaShuttleVan/> Shuttle Bus Services
              </Card.Title>
              <Card.Text>Regular shuttle bus services to and from airport.</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card>
            <Card.Body>
              <Card.Title className="hotel-color">
                <FaSnowflake/> Air conditioning
              </Card.Title>
              <Card.Text>Stay cool and comfort with our air conditioning system.</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default HotelService
