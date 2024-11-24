// src-tauri/src/main.rs
use serde::{Deserialize, Serialize};
use std::collections::HashMap;
use tauri::command;

#[derive(Debug, Serialize, Deserialize)]
struct RequestResponse {
    status: u16,
    headers: HashMap<String, String>,
    body: String,
}

#[command]
async fn make_request(
    url: String,
    method: String,
    headers: HashMap<String, String>,
    body: Option<String>,
) -> Result<RequestResponse, String> {
    let client = reqwest::Client::new();

    let mut request_builder = match method.as_str() {
        "GET" => client.get(&url),
        "POST" => client.post(&url),
        "PUT" => client.put(&url),
        "DELETE" => client.delete(&url),
        _ => return Err("Unsupported HTTP method".to_string()),
    };

    // Add headers
    for (key, value) in headers {
        request_builder = request_builder.header(key, value);
    }

    // Add body for POST/PUT requests
    if let Some(body_content) = body {
        request_builder = request_builder.body(body_content);
    }

    // Send request
    let response = request_builder
        .send()
        .await
        .map_err(|e| e.to_string())?;

    // Convert response headers
    let headers: HashMap<String, String> = response
        .headers()
        .iter()
        .map(|(k, v)| (k.to_string(), v.to_str().unwrap_or("").to_string()))
        .collect();

    let status = response.status().as_u16();
    let body = response.text().await.map_err(|e| e.to_string())?;

    Ok(RequestResponse {
        status,
        headers,
        body,
    })
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![make_request])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}