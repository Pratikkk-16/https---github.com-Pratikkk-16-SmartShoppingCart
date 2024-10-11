import cv2
from pyzbar import pyzbar

def read_barcodes(frame):
    barcodes = pyzbar.decode(frame)
    for barcode in barcodes:
        x, y, w, h = barcode.rect
        # Draw a rectangle around the barcode in the image
        cv2.rectangle(frame, (x, y), (x + w, y + h), (0, 255, 0), 2)

        # The barcode data is a bytes object, so convert it to a string
        barcode_data = barcode.data.decode('utf-8')
        barcode_type = barcode.type

        # Draw the barcode data and type on the image
        text = f'{barcode_data} ({barcode_type})'
        cv2.putText(frame, text, (x, y - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)

        print(f'Read barcode: {barcode_data} of type: {barcode_type}')

    return frame

def main():
    # Initialize the webcam
    cap = cv2.VideoCapture(0)
    cap.set(cv2.CAP_PROP_FRAME_WIDTH, 1920)
    cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 1080)

    while True:
        ret, frame = cap.read()

        if not ret:
            break

        # Read and decode the barcodes in the current frame
        frame = read_barcodes(frame)

        # Display the frame with the decoded information
        cv2.imshow('Barcode/QR code reader', frame)

        # Exit the loop when 'q' is pressed
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    # Release the webcam and close windows
    cap.release()
    cv2.destroyAllWindows()

if __name__ == '__main__':
    main()
