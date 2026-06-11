sudo -u postgres psql -d sch_termodinamicacsjn -c "UPDATE roles SET rol = 'Supervisor Palacio' WHERE \"idRol\" = 3;"

sudo -u postgres psql -d sch_termodinamicacsjn -c "UPDATE usuarios SET usuario = 'Supervisor Palacio' WHERE \"idRol\" = 3;"

#verificar
sudo -u postgres psql -d sch_termodinamicacsjn -c "SELECT \"idRol\", rol FROM roles;"