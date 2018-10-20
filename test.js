var sample = `{
    "prices": [
      {
        "localized_display_name": "POOL",
        "distance": 6.17,
        "display_name": "POOL",
        "product_id": "26546650-e557-4a7b-86e7-6a3942445247",
        "high_estimate": 15,
        "low_estimate": 13,
        "duration": 1080,
        "estimate": "$13-14",
        "currency_code": "USD"
      },
      {
        "localized_display_name": "uberX",
        "distance": 6.17,
        "display_name": "uberX",
        "product_id": "a1111c8c-c720-46c3-8534-2fcdd730040d",
        "high_estimate": 17,
        "low_estimate": 13,
        "duration": 1080,
        "estimate": "$13-17",
        "currency_code": "USD"
      }
    ]}`

    console.log(JSON.parse(sample).prices[0]);