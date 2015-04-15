import socket


UDP_IP = ''
UDP_PORT = 5005


s = socket.socket(socket.AF_INET,
                     socket.SOCK_STREAM)
s.bind(('', UDP_PORT))
s.listen(5)
while True:
        c, addr = s.accept()
        data, addr = c.recvfrom(1024)
        print 'Got connection from', addr
        print 'recieve message:' , data
        c.send('thank you for connecting')
        c.close()
