# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

# Création de 3 participants avec leurs projets respectifs
participants_data = [
  { name: "Alice ", project_name: "Projet Vert" },
  { name: "Bob ", project_name: "Projet Bleu" },
  { name: "Claire", project_name: "Projet Jaune" },
  { name: "Alex", project_name: "Projet Violet" },
  { name: "Anais", project_name: "Projet Rouge" }

]

participants_data.each do |data|
  Participant.create!(data)
end

puts "3 participants avec leurs projets ont été créés avec succès."
