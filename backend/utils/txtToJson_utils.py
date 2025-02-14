import json
import os

MOCK_DATA_PATH = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'mock')


def split_text_sections(file_path, output_json_path=None):

    # Define the sections we want to extract
    sections = {
        'Research Problem and Objectives': '',
        'Methodology': '',
        'Results': '',
        'Conclusion and Implications': ''
    }
    file_path = os.path.join(MOCK_DATA_PATH, file_path)
    delimiter = '-' * 80
    if (file_path == None):
        file_path = 'final_synopsis.txt'
    try:
        
        with open(file_path, 'r', encoding='utf-8') as file:
            content = file.read()
        
        # Find the starting positions of each section
        section_positions = []
        for section in sections.keys():
            # Look for both uppercase and lowercase versions of the section headers
            pos = content.find(section)
            if pos != -1:
                section_positions.append((pos, section))
        
        # Sort positions to process sections in order of appearance
        section_positions.sort()
        
        # Extract content between sections
        for i in range(len(section_positions)):
            start_pos = section_positions[i][0]
            section_name = section_positions[i][1]
            
            # If this is the last section, get all remaining text
            if i == len(section_positions) - 1:
                sections[section_name] = content[start_pos + len(section_name):].split(delimiter)[1].strip()
            else:
                # Get text until the next section
                end_pos = section_positions[i + 1][0]
                
                section_text = content[start_pos:end_pos].split(delimiter)[1].strip()
                
                # Remove the section header from the content
                header_end = section_text.find('\n')
                if header_end != -1:
                    section_text = section_text[header_end:].strip()
                    
                sections[section_name] = section_text
        
        # Save to JSON if output path is provided
        if output_json_path:
            with open(output_json_path, 'w', encoding='utf-8') as json_file:
                json.dump(sections, json_file, indent=4, ensure_ascii=False)
            print(f"JSON file saved to: {output_json_path}")
            
        return sections
    
    except FileNotFoundError:
        print(f"Error: File {file_path} not found in call.")
        return None
    except Exception as e:
        print(f"Error processing file: {str(e)}")
        return None
