# Is there a such thing as a top end
import sqlite3
import cgi

connection, cursor = None, None

def connect():
    global connection, cursor
    connection = sqlite3.connect('dont_hack_us.db')
    cursor = connection.cursor()

def disconnect():
    global connection, cursor
    if connection and cursor:
        connection.close()
        connection, cursor = None, None

def create_users_table():
    connect()
    cursor.execute("""create table if not exists users(
        "username" Text,
        "password" Text,
        "userID" int AUTO_INCREMENT
    )""")
    connection.commit()
    disconnect()

def create_worlds_table():
    # Finish maybe
    return None