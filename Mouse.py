import socket

UDP_IP = '192.168.1.133'
UDP_PORT = 5005
MESSAGE = "Hello, World!"

print "UDP target IP:", UDP_IP
print "UDP target port:", UDP_PORT
print "message:", MESSAGE

sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
sock.connect((UDP_IP, UDP_PORT))
sock.sendall('Hello World')
data = sock.recv(1024)
sock.close
