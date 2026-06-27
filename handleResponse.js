/**
 * 處理Response
 *
 * @export
 * @param {number} statusCode - HTTP 狀態碼
 * @param {object} data - 回應資料
 * @param {import('http').ServerResponse} res - Node.js response 物件
 */
function handleResponse(statusCode, data, res) {
  if (res.headersSent) return; // 避免重複回應

  try {
    const body = JSON.stringify(data);
    res.writeHead(statusCode, { "Content-Type": "application/json" });
    res.end(body);
  } catch (err) {
    // data 無法被序列化時（例如含有 circular reference）
    console.error("handleResponse serialization error:", err);
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Internal server error" }));
  }
}

module.exports = { handleResponse };
