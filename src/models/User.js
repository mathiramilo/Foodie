class User {
  constructor(fullName, email, phone, imgUrl) {
    this.fullName = fullName
    this.email = email
    this.phone = phone
    this.imgUrl = imgUrl
    this.favoriteRestaurants = []
  }
}

export default User