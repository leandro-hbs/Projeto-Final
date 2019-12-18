docker-compose exec web /bin/bash
docker-compose exec mysql mysql -u root -p
docker-compose exec mysql mysql -u root -proot dispositivo < back-end/database/db.sql