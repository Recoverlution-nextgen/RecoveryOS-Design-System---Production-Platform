with open('tokens.json', 'r') as f:
    content = f.read()
# Fix the broken iridescent line
content = content.replace('    "iridescent": "linear-gradient(90deg, {semantic-colors.brand-primary-bright},\n {semantic-colors.brand-precision}, {semantic-colors.brand-primary-bright})"', '    "iridescent": "linear-gradient(90deg, {semantic-colors.brand-primary-bright}, {semantic-colors.brand-precision}, {semantic-colors.brand-primary-bright})"')
with open('tokens.json', 'w') as f:
    f.write(content)
