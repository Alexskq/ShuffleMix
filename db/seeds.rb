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
  { name: "Alice Dupont", project_name: "Projet Vert" },
  { name: "Bob Martin", project_name: "Projet Bleu" },
  { name: "Claire Dubois", project_name: "Projet Rouge" }
]

participants_data.each do |data|
  Participant.create!(data)
end

puts "3 participants avec leurs projets ont été créés avec succès."
